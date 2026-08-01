# Bench run: old prompt, run 3

## Security Review — handoff-bench/fixture/src

### Injection risks

- **SQL injection (Critical) — src/db.js:6.** getUserByName builds the query by string concatenation: "SELECT * FROM users WHERE name = '" + name + "'". Any caller passing user input allows classic SQLi. The fix is modeled two lines down: getUserById correctly uses a parameterized query. getUserByName should do the same.
- **OS command injection (Critical) — src/routes/reports.js:8.** exec('reportgen --range ' + req.query.range, ...) passes an unsanitized query parameter straight into a shell command. An attacker can inject shell metacharacters for full remote code execution. Use execFile/spawn with an argument array and validate range against a strict allow-list.
- **Reflected XSS (High) — src/routes/reports.js:17.** res.send('<h1>Report: ' + req.query.title + ...) interpolates req.query.title into HTML with no encoding. A crafted link executes in the victim's authenticated session. HTML-escape the value or use an auto-escaping template, and add a CSP.
- **Path traversal (High) — src/routes/users.js:25.** res.sendFile(path.join(UPLOADS, req.query.name)) joins unsanitized input into a filesystem path. path.join does not block .. segments, so name=../../../../etc/passwd escapes UPLOADS. Reject .. and absolute segments, or resolve the path and verify it stays within UPLOADS.

### Authorization gaps

- **Missing authorization / unauthenticated admin data dump (Critical) — src/routes/users.js:19-21.** GET /admin/all has no auth check at all, not even the inline session check used on /:id, and it is not wrapped with the requireAuth middleware already passed into this router factory. It returns every user row to anyone, unauthenticated. Minimum fix: r.get('/admin/all', requireAuth, ...), plus a real role check.
- **IDOR — Broken Object-Level Authorization (High) — src/routes/users.js:10-16.** GET /:id checks only that req.session.userId is set, not that the caller is entitled to view this id. Any authenticated user can enumerate and read any other user's full row. Needs an explicit ownership or role check.
- **Authentication without authorization on file download (Medium) — src/routes/users.js:24-26.** /files/download does require a session, but never checks that the requesting user owns the requested file. Combined with the path traversal above, any logged-in user can read arbitrary uploaded files belonging to other accounts.
- **Injection-vulnerable helper reused in an admin path (Medium) — src/routes/users.js:20.** /admin/all calls getUserByName('%', ...), reusing the SQLi-vulnerable function. The literal is hardcoded so it is not attacker-controlled today, but wiring an admin listing through a string-concatenation query is fragile. Also the query uses = not LIKE, so '%' does not behave as a wildcard, a functional bug riding along.

### Secrets handling

- **Hardcoded live API key (Critical) — src/config.js:2.** billingApiKey: 'sk_live_9f2aa81cbb04d7e2c661' is a live-looking secret committed directly to source. Treat as compromised: revoke and rotate, and load exclusively from environment or a secrets manager, matching dbPassword on the next line.
- **Insecure default for an auth-critical secret (High) — src/config.js:4.** jwtSecret: process.env.JWT_SECRET || 'dev-secret' silently falls back to a fixed, publicly visible value if the env var is unset, allowing full authentication bypass. Fail closed on startup instead of defaulting a trust-bearing secret.
- **Sensitive data in logs (Low/Medium) — src/routes/reports.js:10.** logger.info('report generated for', { user: req.session.user }) logs the entire session user object via bare console, with no redaction, risking PII and session data leaking into log aggregation.
- **Dead secret with no compensating benefit (Low) — src/config.js.** Nothing under src/ actually requires config.js (server.js hardcodes app.listen(3000)). The file exists as unused liability and the live-looking key sits there for no operational reason.

### Code style

- Inconsistent function style within the same file, function (req, res) mixed with arrow functions in src/routes/users.js.
- Inconsistent or absent error handling: DB callback errors are silently ignored in src/routes/users.js:15,20, while src/routes/reports.js:9 does check err.
- logger = console (src/routes/reports.js:3) is an ad hoc logging shim with no levels or structured fields.
- src/db.js:2 opens the sqlite file via a relative path, fragile with respect to process cwd.

### Performance

- SELECT * with no column projection or pagination on src/db.js:6 and its use in /admin/all, a full unbounded table scan on every call.
- child_process.exec in src/routes/reports.js:8 buffers the entire PDF output in memory and is subject to Node's default maxBuffer, so larger reports silently truncate. Prefer spawn streamed into the response.
- No caching or streaming considerations for /reports/view or /files/download; every request re-reads from disk with no conditional GET support.
