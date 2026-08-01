# Bench run: new prompt, run 1

**Critical/high findings (repeated for visibility):**
- [CRITICAL][INJECTION] src/routes/reports.js:8 — exec('reportgen --range ' + req.query.range, ...) builds a shell command by concatenating an unsanitized query parameter; any authenticated session can run arbitrary OS commands.
- [CRITICAL][AUTHZ] src/routes/users.js:19-21 — GET /admin/all has no requireAuth and no session check at all, so it is reachable with zero authentication.
- [HIGH][INJECTION] src/routes/users.js:25 — res.sendFile(path.join(UPLOADS, req.query.name)) with no root option lets ../ sequences in name escape the uploads directory for arbitrary file read.
- [HIGH][AUTHZ] src/routes/users.js:10-16 — GET /:id checks only that a session exists, not that the caller owns or may view that id; any logged-in user can fetch any other user's full record.
- [HIGH][SECRETS] src/config.js:2 — billingApiKey is a literal, live-formatted (sk_live_...) key hardcoded in source.

**1. Status:** SECRET_FOUND

**2. Scope covered:** Read all 7 files under the target directory (confirmed via full directory listing): README.md, package.json, src/config.js, src/db.js, src/server.js, src/routes/reports.js, src/routes/users.js. Findings are drawn from the five files under src/. Full target covered, nothing left out.

**3. Findings:**
- [CRITICAL][INJECTION] src/routes/reports.js:8 — exec('reportgen --range ' + req.query.range, ...) passes a string built from req.query.range straight to a shell, with no validation or escaping. A value like "x; cat /etc/passwd" runs attacker-chosen commands. Fix: use execFile with an argument array and validate range.
- [CRITICAL][AUTHZ] src/routes/users.js:19-21 — r.get('/admin/all', ...) has no requireAuth argument and no inline session check, unlike /:id (inline check) and /files/download (requireAuth middleware) in the same file. Reachable by anyone. Fix: add requireAuth plus a role check.
- [HIGH][INJECTION] src/routes/users.js:25 (UPLOADS line 4) — res.sendFile(path.join(UPLOADS, req.query.name)) without the root option; path.join collapses .. segments so name=../../../../etc/passwd resolves outside uploads and is served. Fix: sendFile with { root: UPLOADS } and reject names containing / \ or ..
- [HIGH][AUTHZ] src/routes/users.js:10-16 — GET /:id checks req.session.userId is present but never checks it matches req.params.id or a permitting role, then returns the full row. Any authenticated user can enumerate ids. Fix: verify ownership or an admin role.
- [HIGH][SECRETS] src/config.js:2 — billingApiKey is a literal secret checked into source, formatted like a live billing key (value redacted). Contrast with dbPassword on line 3, which correctly reads from process.env. Note: no file under src/ currently imports config.js, so the key is not wired into the running app, but it is still committed. Fix: read from env or a secret manager, and rotate.
- [MEDIUM][INJECTION] src/routes/reports.js:17 — res.send('<h1>Report: ' + req.query.title + '</h1>...') interpolates req.query.title into an HTML response with no escaping, so a script payload is reflected and executed. Fix: HTML-escape or use auto-escaping templating.
- [MEDIUM][INJECTION] src/db.js:6 — getUserByName runs db.all("SELECT * FROM users WHERE name = '" + name + "'", cb), concatenating name into the query with no parameterization (contrast getUserById, which uses a ? placeholder). A genuine SQL injection primitive. As wired, the only call site passes the literal '%', not request input, so there is no exploitable path through the routes reviewed today; the doc comment says it is meant for the search box, so it remains unsafe for any caller that passes input. Fix: parameterize as getUserById does.
- [MEDIUM][SECRETS] src/config.js:4 — jwtSecret: process.env.JWT_SECRET || 'dev-secret'. The env-var reference is fine; the issue is the hardcoded fallback, which becomes the actual signing secret wherever JWT_SECRET is unset, allowing token forgery. Fix: remove the fallback and fail startup if unset.

**4. Secrets escalation:** src/config.js:2 contains a literal credential formatted like a live key (sk_live_ prefix) assigned to billingApiKey. Value not reproduced. Should be rotated and removed from source.

**5. Noticed but out of scope:**
- src/routes/users.js:19-21: independent of the missing auth, getUserByName does an exact = match, not LIKE, so passing '%' matches only a row literally named %. Worth knowing before anyone fixes this route's logic.
- No express-session appears in package.json or under src/, and server.js configures no session middleware, so req.session may be undefined at runtime. The authorization findings assess the access-control logic as written.

**6. Beyond what was asked:** none.
