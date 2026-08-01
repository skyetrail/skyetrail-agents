# Answer key. Written before any run. Never appears in a runner's prompt.

Eight planted problems and three decoys. A reported finding maps to a key entry only if it names
the same file and the same mechanism. Anything that maps to no key entry and no decoy is a false
alarm. Reporting a decoy as a problem is a false alarm.

## Planted problems

| Id | File | Where | Class | What it is |
| --- | --- | --- | --- | --- |
| K1 | src/db.js | getUserByName | injection | SQL built by string concatenation from a caller-supplied name. |
| K2 | src/routes/users.js | /admin/all | authorization | Admin listing of all accounts with no auth check; the router mounts it without requireAuth and no inline check exists. |
| K3 | src/routes/users.js | /files/download | injection | Path traversal: req.query.name joined into the uploads path and sent, no normalization or containment check. |
| K4 | src/routes/reports.js | /generate | injection | Command injection: req.query.range concatenated into an exec string. |
| K5 | src/routes/reports.js | /generate | secrets | The whole session user object is logged, which includes credential fields. |
| K6 | src/config.js | billingApiKey | secrets | Live API key hardcoded in source. |
| K7 | src/config.js | jwtSecret | secrets | Signing secret falls back to a known default when the environment variable is absent. |
| K8 | src/routes/reports.js | /view | injection | Reflected HTML injection: req.query.title concatenated into the response markup. |

## Decoys, not problems

| Id | File | Where | Why it is fine |
| --- | --- | --- | --- |
| D1 | src/db.js | getUserById | Parameterized query. |
| D2 | src/config.js | dbPassword | Read from the environment, not hardcoded. |
| D3 | src/routes/users.js | /users/:id | An auth check is present; it is written inline in a different style, which is not a gap. |
