Status: SECRET_FOUND

Findings:
- [CRITICAL][INJECTION] src/routes/reports.js:8 - exec() with unescaped req.query.range, shell command injection
- [CRITICAL][INJECTION] src/db.js:6 - SQL injection via string concatenation in getUserByName
- [CRITICAL][AUTHORIZATION] src/routes/users.js:19-20 - /admin/all has no access check at all
- [CRITICAL][SECRETS] src/config.js:2 - live-looking billing API key hardcoded in source
- [HIGH][INJECTION] src/routes/users.js:25 - path traversal via path.join(UPLOADS, req.query.name)
- [HIGH][INJECTION] src/routes/reports.js:17 - reflected XSS via unescaped req.query.title
- [MEDIUM][SECRETS] src/config.js:4 - jwtSecret falls back to hardcoded 'dev-secret'
- [MEDIUM][SECRETS] src/routes/reports.js:10 - logger.info handed whole req.session.user object

Scope covered: all five files under src/ in full.
Noticed but out of scope: none
Beyond what was asked: read package.json, searched tree for config.js consumers. No changes made.
