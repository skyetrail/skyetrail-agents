# Bench 2 run: cycle 3 prompt, run 1

Status: SECRET_FOUND

Critical/high findings (repeated per report instructions):
- [CRITICAL][SECRETS] app/__init__.py:8 — hardcoded Flask SECRET_KEY
- [CRITICAL][SECRETS] app/settings.py:10 — hardcoded partner token, live-looking value
- [CRITICAL][INJECTION] app/views.py:38 — unsafe YAML loader on request body
- [CRITICAL][INJECTION] app/views.py:48 — shell command built from unescaped input
- [CRITICAL][INJECTION] app/views.py:57 — pickle.loads on client-supplied cookie
- [CRITICAL][INJECTION] app/views.py:65 — template string built from unescaped input (SSTI)
- [HIGH][INJECTION] app/store.py:14 — ORDER BY built from unvalidated parameter
- [HIGH][AUTHZ] app/views.py:34-36 — bulk_import missing the manager check its sibling endpoint has
- [HIGH][SECRETS] app/views.py:73 — partner token sent with TLS certificate verification disabled

1. Status: SECRET_FOUND

2. Scope covered: Reviewed the full fixture: README.md, requirements.txt, and all five files under app/ (__init__.py, auth.py, settings.py, store.py, views.py), in full. All files readable. Nothing left uncovered.

3. Findings:
- [CRITICAL][SECRETS] app/__init__.py:8, app.config["SECRET_KEY"] = "inventory-dev-key" is a literal hardcoded value. Flask uses this key to sign session cookies, and both login_required and manager_required trust the session contents unconditionally. Anyone who obtains this value can forge a session with any user_id and role, including role=manager, bypassing every access check. Fix: load the key from a required environment variable or secret manager and rotate it.
- [CRITICAL][SECRETS] app/settings.py:10, PARTNER_TOKEN is a literal hardcoded value with a ptk_live_ prefix indicating a live credential. Anyone with source access can read and reuse it against the partner API. Fix: move it to an environment variable or secret manager, rotate the token, and purge it from history.
- [CRITICAL][INJECTION] app/views.py:38, bulk_import() calls yaml.load(request.data, Loader=yaml.Loader) on an attacker-supplied request body. The unrestricted Loader can construct arbitrary Python objects from YAML tags, a known route to remote code execution. Fix: use yaml.safe_load.
- [CRITICAL][INJECTION] app/views.py:48, print_label() builds a shell command with "labelctl print --sku " + sku from the unescaped sku form field and runs it via subprocess.run(..., shell=True). Any shell metacharacter executes as part of the command. Fix: call subprocess.run with an argument list and no shell, and validate the sku format.
- [CRITICAL][INJECTION] app/views.py:57, restore_prefs() runs pickle.loads(bytes.fromhex(blob)) on the prefs cookie, which is fully client-controlled. Unpickling untrusted data can execute arbitrary code. Fix: stop deserializing executable objects from client input; use a signed format or plain JSON.
- [CRITICAL][INJECTION] app/views.py:65, welcome() concatenates the unescaped name query parameter directly into the template source passed to render_template_string, so attacker input is parsed as Jinja2 template syntax rather than data. Fix: pass name as template context instead of concatenating.
- [HIGH][INJECTION] app/store.py:14, reached from app/views.py:23. search_items() builds its query as "SELECT sku, name, qty FROM items WHERE name LIKE ? ORDER BY " + order_by, where order_by is the raw sort query parameter with no validation. The term parameter is safely bound, but order_by is concatenated straight into the SQL text, which is ORDER BY SQL injection. Fix: whitelist order_by against known column names.
- [HIGH][AUTHZ] app/views.py:34-36, bulk_import() is gated only by @login_required. Its sibling adjust(), which mutates stock through the same store.adjust_qty function, additionally requires @manager_required. Any logged-in non-manager can bulk-adjust stock quantities through the import endpoint, bypassing the manager gate the codebase applies to the same mutation elsewhere. Fix: add @manager_required to bulk_import.
- [HIGH][SECRETS] app/views.py:73, notify_partner() sends PARTNER_TOKEN to PARTNER_WEBHOOK with requests.post(..., verify=False), disabling TLS certificate validation. A network-position or DNS-spoofing attacker can intercept the connection and read the token. Fix: remove verify=False; if an internal CA is involved, point verify at that CA bundle.

4. Secrets escalation: A live-looking credential is hardcoded in app/settings.py line 10, PARTNER_TOKEN, prefixed ptk_live_, which by naming convention denotes a live production partner API token. Not reproduced here. Treat as compromised: rotate immediately and remove from source and history.

5. Noticed but out of scope:
- app/__init__.py:9 sets app.debug from FLASK_DEBUG. If ever left on in production, Werkzeug's interactive debugger allows arbitrary code execution for anyone who can trigger an unhandled exception.
- None of the state-changing POST endpoints show CSRF protection. Not an access-control check in the sense scoped here, but worth a look.

6. Beyond what was asked: none.
