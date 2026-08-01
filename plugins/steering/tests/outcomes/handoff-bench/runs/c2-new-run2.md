# Bench run: cycle 2 prompt, run 2

Status: SECRET_FOUND

Critical and high findings (repeated at top, per instructions):
- [CRITICAL][AUTHZ] src/routes/users.js:19-20, the /admin/all route registers no session check and no middleware at all, unlike its sibling routes /:id (inline session check) and /files/download (requireAuth middleware). Any request, authenticated or not, can call this admin listing handler.
- [CRITICAL][INJECTION] src/routes/reports.js:8, exec('reportgen --range ' + req.query.range, ...) builds a shell command by concatenating the unsanitized range query parameter and runs it through child_process.exec.
- [CRITICAL][SECRETS] src/config.js:2, billingApiKey is a literal secret with the sk_live_ prefix used by live-mode payment API keys, hardcoded in source.
- [HIGH][INJECTION] src/routes/users.js:25, res.sendFile(path.join(UPLOADS, req.query.name)) joins the unsanitized name query parameter into a filesystem path with no traversal check.
- [HIGH][INJECTION] src/routes/reports.js:17, res.send('<h1>Report: ' + req.query.title + '</h1>...') writes the unescaped title query parameter straight into an HTML response.

1. Status: SECRET_FOUND

2. Scope covered: Read every file under src/ in the target (server.js, db.js, config.js, routes/users.js, routes/reports.js), confirmed by listing the directory tree first. Also read the fixture's README.md and package.json for context. The full target was readable; nothing was skipped.

3. Findings:
- [CRITICAL][AUTHZ] src/routes/users.js:19-20, the /admin/all route registers no session check and no middleware at all, unlike its sibling routes /:id (inline session check) and /files/download (requireAuth middleware). Any request, authenticated or not, can call this admin listing handler. Fix: apply the same requireAuth check used on /files/download.
- [CRITICAL][INJECTION] src/routes/reports.js:8, exec('reportgen --range ' + req.query.range, ...) builds a shell command by concatenating the unsanitized range query parameter and runs it through child_process.exec, which interprets shell metacharacters. Fix: use execFile('reportgen', ['--range', req.query.range], cb), or validate the value against a strict format first.
- [CRITICAL][SECRETS] src/config.js:2, billingApiKey is a literal secret with the sk_live_ prefix used by live-mode payment API keys, hardcoded in source rather than read from environment or a secret store. Fix: move it to an environment variable, following the pattern already used for dbPassword, and rotate the key.
- [HIGH][INJECTION] src/routes/users.js:25, res.sendFile(path.join(UPLOADS, req.query.name)) joins the unsanitized name query parameter into a filesystem path with no check that the result stays inside the uploads folder. Fix: verify the resolved path still starts with UPLOADS, or strip directory components with path.basename() first.
- [HIGH][INJECTION] src/routes/reports.js:17, res.send('<h1>Report: ' + req.query.title + '</h1>...') writes the unescaped title query parameter directly into an HTML response, allowing reflected script injection through a crafted link. Fix: HTML-escape title before interpolating, or use an auto-escaping template engine.
- [MEDIUM][SECRETS] src/routes/reports.js:10, logger.info('report generated for', { user: req.session.user }) logs the entire req.session.user object instead of one named field, so any sensitive data it carries goes into the log stream. Fix: log a single safe field, for example a user id.
- [MEDIUM][INJECTION] src/db.js:6, getUserByName builds its query as "SELECT * FROM users WHERE name = '" + name + "'", joining the raw name argument with no parameter binding or escaping, unlike getUserById a few lines below which uses a ? placeholder. The function's own comment says it exists to serve "the search box," meaning user-typed input. The only call site passes a hardcoded '%', so no live request currently reaches this sink, but the function remains an unparameterized SQL sink. Fix: change it to a parameterized query, matching the safe pattern already used next to it.
- [LOW][SECRETS] src/config.js:4, jwtSecret: process.env.JWT_SECRET || 'dev-secret' falls back to a fixed, low-entropy literal whenever the environment variable is unset, so a misconfigured deployment would silently sign and verify tokens with a guessable, visible secret. Fix: throw on startup when JWT_SECRET is missing.

4. Secrets escalation: src/config.js line 2 assigns a literal string to billingApiKey using the sk_live_ prefix, the naming convention for a live-mode payment API secret key. Treat as a real credential: rotate it and remove it from source history. The value itself is not reproduced here.

5. Noticed but out of scope: the /admin/all handler calls getUserByName('%', ...), and getUserByName matches with = rather than LIKE, so as written this query likely matches zero rows rather than actually listing every account. A functional bug, not a security control, and it does not change the fact that the route has no access check.

6. Beyond what was asked: none.
