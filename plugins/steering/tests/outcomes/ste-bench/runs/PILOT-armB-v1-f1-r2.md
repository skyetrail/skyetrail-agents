DISCARDED PILOT. This run used version 1 of the STE prompt, which the equivalence
check found not equivalent to the current prompt. Kept to show the rewrite ran.
Not scored.

Status: SECRET_FOUND

Findings:
- [CRITICAL][SECRETS] src/config.js:2 - billingApiKey hardcoded, live-mode prefix
- [HIGH][SECRETS] src/config.js:4 - jwtSecret falls back to 'dev-secret'
- [CRITICAL][INJECTION] src/routes/reports.js:8 - exec() concatenates req.query.range
- [HIGH][INJECTION] src/routes/reports.js:17 - raw req.query.title into HTML, reflected XSS
- [MEDIUM][SECRETS] src/routes/reports.js:10 - logger.info logs whole req.session.user
- [CRITICAL][AUTHZ] src/routes/users.js:19-20 - /admin/all has no access check
- [HIGH][INJECTION] src/routes/users.js:25 - path.join with raw req.query.name, traversal
- [HIGH][INJECTION] src/db.js:6 - getUserByName concatenates into SQL, unparameterized

Scope covered: all five files under src/, 82 lines.
Noticed but out of scope: = vs LIKE logic point; config.js not required elsewhere in src/.
Beyond what was asked: none
