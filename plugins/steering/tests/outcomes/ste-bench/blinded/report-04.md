Status: SECRET_FOUND

Findings:
- [CRITICAL][SECRETS] src/config.js:2 - billingApiKey literal, live Stripe secret-key format
- [MEDIUM][SECRETS] src/config.js:4 - jwtSecret falls back to hardcoded 'dev-secret'
- [MEDIUM][INJECTION] src/db.js:6 - getUserByName concatenates name into SQL, unlike getUserById which uses ?. Only current caller passes literal '%', so not attacker-reachable today.
- [CRITICAL][INJECTION] src/routes/reports.js:8 - req.query.range concatenated into exec() shell command
- [MEDIUM][SECRETS] src/routes/reports.js:10 - logger.info passes whole req.session.user object
- [HIGH][INJECTION] src/routes/reports.js:17 - req.query.title concatenated unescaped into HTML
- [CRITICAL][AUTHZ] src/routes/users.js:19-21 - /admin/all has no access check, siblings do
- [HIGH][INJECTION] src/routes/users.js:25 - req.query.name joined into path, no traversal check

Scope covered: all five files under src/ in full.
Noticed but out of scope: db.js:6 uses = rather than LIKE, a logic question.
Beyond what was asked: read README.md and package.json for background.
