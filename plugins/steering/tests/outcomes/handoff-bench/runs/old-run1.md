# Bench run: old prompt, run 1

## Security Review — `handoff-bench/fixture/src`

### Injection

- **OS command injection (critical)** — `routes/reports.js:8`: `exec('reportgen --range ' + req.query.range, ...)` concatenates unsanitized user input directly into a shell command. Any authenticated user can run arbitrary shell commands on the server. Fix: use `execFile`/`spawn` with an argument array (no shell), and validate `range` against a strict allowlist/regex.
- **SQL injection** — `db.js:6`, `getUserByName`: builds a query via string concatenation (`"...WHERE name = '" + name + "'"`). No current call site passes untrusted input (`routes/users.js:20` calls it with a literal `'%'`), but the helper itself is unsafe and will become exploitable the moment it's wired to a real query param (its doc comment says "for the search box"). Fix: parameterize like `getUserById` already does.
- **Reflected XSS** — `routes/reports.js:17`: `res.send('<h1>Report: ' + req.query.title + '</h1>...')` echoes `req.query.title` into HTML with no encoding. Since the route sits behind session auth, this can be used to hijack an authenticated user's session via a crafted link. Fix: HTML-escape the value or use a templating engine with auto-escaping.
- **Path traversal / arbitrary file read** — `routes/users.js:25`: `res.sendFile(path.join(UPLOADS, req.query.name))`. `path.join` does not strip `..` segments, so `name=../../../../etc/passwd` escapes `UPLOADS`. Fix: resolve the final path and verify it is still inside `UPLOADS`, or restrict to a basename.

### Authorization

- **Missing authorization on admin endpoint (critical)** — `routes/users.js:19-21`, `/admin/all`: no `requireAuth` or any check is applied, unlike the sibling `/files/download` route in the same file. Anyone, unauthenticated, can hit this endpoint. It also returns raw DB rows.
- **IDOR / excessive data exposure** — `routes/users.js:10-16`, `/:id`: confirms only that some user is logged in, not that they may view this profile. Any authenticated user can enumerate `/users/1`, `/users/2` and get another user's full row. Fix: authorize by ownership/role, project only public-safe fields.
- **Inconsistent enforcement pattern** — auth is implemented three different ways across two files: the shared `requireAuth` middleware, a hand-rolled duplicate check inline in `/users/:id`, and no check at all on `/users/admin/all`. Fix: route everything through one authorization layer.
- **Weak JWT secret fallback** — `config.js:4`: `jwtSecret: process.env.JWT_SECRET || 'dev-secret'`. If the env var is unset in any environment including prod, the service silently signs and verifies tokens with a hardcoded, publicly visible value, allowing token forgery. Fix: fail fast at startup if `JWT_SECRET` is missing.

### Secrets handling

- **Hardcoded live API key (critical)** — `config.js:2`: `billingApiKey: 'sk_live_9f2aa81cbb04d7e2c661'` is a live secret committed to source. Fix: remove from source, load from env or a secret manager, and rotate the key immediately.
- Contrast with `dbPassword`/`jwtSecret` in the same file, which correctly read from `process.env` — the billing key should follow the same pattern.

### Code style / performance

- `server.js:13` hardcodes `app.listen(3000)` instead of using `config.port`, so the config value is dead code.
- `reports.js:10` logs `req.session.user`, but every other file consistently uses `req.session.userId` — likely logs `undefined` and suggests a copy-paste inconsistency.
- `child_process.exec` spawns a shell for every request; `execFile` avoids the extra shell process and is cheaper.
- `res.json(u)` / `res.json(rows)` send whole DB rows verbatim — no DTO layer, so any future column is automatically exposed.
- No centralized error-handling middleware in `server.js`; each route hand-rolls its own status codes.
