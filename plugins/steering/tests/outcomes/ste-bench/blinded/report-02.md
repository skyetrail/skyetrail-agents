Status: SECRET_FOUND

Findings:
- [CRITICAL][INJECTION] src/routes/reports.js:8 - exec() concatenating req.query.range
- [CRITICAL][INJECTION] src/db.js:6 - getUserByName string-concatenated SQL, no binding
- [CRITICAL][AUTHORIZATION] src/routes/users.js:19-21 - /admin/all no access check, siblings have one
- [CRITICAL][SECRETS] src/config.js:2 - billingApiKey literal 
- [HIGH][INJECTION] src/routes/users.js:25 - path.join with req.query.name, no containment
- [HIGH][INJECTION] src/routes/reports.js:17 - req.query.title unescaped into HTML
- [MEDIUM][SECRETS] src/config.js:4 - jwtSecret falls back to 'dev-secret'
- [MEDIUM][SECRETS] src/routes/reports.js:10 - logger.info logs whole req.session.user

Scope covered: all five files under src/, confirmed by directory listing. Noted that
session middleware setup is absent from the target, so session security was not reviewable.
Noticed but out of scope: = vs LIKE means the admin route may return no rows today.
Beyond what was asked: read package.json and README.md for background.
