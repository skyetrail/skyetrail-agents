# Bench run: old prompt, run 2

**Scope:** config.js, db.js, routes/reports.js, routes/users.js, server.js

## Injection

- **[Critical] OS command injection — routes/reports.js:8.** exec('reportgen --range ' + req.query.range, ...) passes unsanitized user input straight to a shell. Use execFile/spawn with an argument array, and validate range against a strict allowlist pattern.
- **[High] SQL injection — db.js:6.** getUserByName builds the query via string concatenation: "SELECT * FROM users WHERE name = '" + name + "'". A name like ' OR '1'='1 returns all rows. getUserById already does this correctly with a parameterized ? placeholder.
- **[High] Reflected XSS — routes/reports.js:17.** /view echoes req.query.title directly into HTML with no encoding. A title containing a script tag executes in the victim's session. Escape output or use a templating engine with auto-escaping.
- **[High] Path traversal — routes/users.js:25.** res.sendFile(path.join(UPLOADS, req.query.name)) does not constrain the result to UPLOADS. name=../../../../etc/passwd escapes the intended directory. Resolve the final path and verify it is still a descendant of UPLOADS.

## Authorization

- **[Critical] Missing auth entirely — routes/users.js:19-21.** /admin/all has no requireAuth and no role check, unlike every other route in the file. Any anonymous caller can hit this endpoint. Note the query itself (getUserByName('%') against an = comparison, not LIKE) likely does not work as the author intended, but the missing access control is the real bug regardless.
- **[High] IDOR on /:id — routes/users.js:10-16.** The inline check only verifies a session exists; it never confirms the caller is allowed to view the requested id. Any authenticated user can enumerate /users/1, /users/2 and read other users' full profiles.
- **[Medium] Inconsistent enforcement pattern.** Three routes in users.js use three different auth mechanisms: an ad hoc inline session check (/:id), the shared requireAuth middleware (/files/download), and nothing at all (/admin/all). Standardize on the shared middleware.
- **[Low] Coarse-grained report authorization.** /reports/* only checks that a session exists (server.js:12), with no check that the caller may access the specific report or date range requested. May be fine if reports are not user-scoped, but worth confirming.

## Secrets Handling

- **[Critical] Hardcoded live secret — config.js:2.** billingApiKey: 'sk_live_9f2aa81cbb04d7e2c661' is a live-looking billing API key committed directly to source. Rotate immediately and load from environment or a secrets manager like dbPassword does one line below.
- **[High] Insecure fallback secret — config.js:4.** jwtSecret: process.env.JWT_SECRET || 'dev-secret' silently falls back to a hardcoded, publicly visible value if the env var is not set, so every JWT can be forged. Fail fast at startup instead.
- **[Low] Session object logged wholesale — routes/reports.js:10.** logger.info('report generated for', { user: req.session.user }) logs the entire session user object. If that object carries anything beyond an ID (tokens, email, PII), it ends up in log storage. Log a user ID only.

## Code Style

- Mixed function styles throughout with no apparent convention.
- db.js mixes string-concatenated and parameterized query styles in the same small module.
- Error-first callback parameters are routinely ignored, so errors are silently swallowed.
- server.js hardcodes app.listen(3000) instead of using config.js's port value.
- console is aliased as logger with no levels or structure.

## Performance

- **routes/reports.js:8** — exec buffers the entire reportgen output in memory, has no timeout, and is not killed on client disconnect. Prefer spawn streamed into the response with an explicit timeout.
- **routes/users.js:19-21** — /admin/all returns every user row with no pagination or field projection.
- **db.js** — both queries SELECT *; returning full rows to callers that only need a subset is wasteful and, combined with res.json(u), becomes a data-exposure issue too.
