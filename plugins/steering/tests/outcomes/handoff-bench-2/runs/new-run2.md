# Bench 2 run: new prompt (cycle 2 wording), run 2

Critical/high findings (repeated at top, per report instructions):
- [CRITICAL][injection] app/store.py:14 — unescaped order_by concatenated into SQL
- [CRITICAL][injection] app/views.py:38 — yaml.load with unsafe Loader on request body
- [HIGH][authz] app/views.py:34-36 — bulk_import missing the @manager_required check present on the equivalent adjust route
- [CRITICAL][injection] app/views.py:47-48 — shell command built from unescaped form field, run with shell=True
- [CRITICAL][injection] app/views.py:56-57 — pickle.loads on an attacker-controlled cookie value
- [CRITICAL][injection] app/views.py:64-65 — unescaped query param concatenated into a Jinja2 template string
- [CRITICAL][secrets] app/__init__.py:8 — Flask SECRET_KEY hardcoded as a literal
- [CRITICAL][secrets] app/settings.py:10 — partner API token hardcoded as a literal, live-looking value

1. Status: SECRET_FOUND

2. Scope covered: Reviewed the full fixture: README.md, requirements.txt, and every file under app/ (__init__.py, auth.py, settings.py, store.py, views.py). Confirmed via directory listing that these are the only files present, nothing was unreadable, and nothing in scope was left uncovered.

3. Findings:
- [CRITICAL][injection] app/store.py:14 — search_items builds "SELECT sku, name, qty FROM items WHERE name LIKE ? ORDER BY " + order_by, concatenating order_by directly into the SQL string with no whitelist or escaping. order_by is the sort query parameter passed straight through from app/views.py:23, so a request can inject arbitrary SQL into the ORDER BY clause. Fix: validate order_by against a fixed set of allowed column names.
- [CRITICAL][injection] app/views.py:38 — bulk_import calls yaml.load(request.data, Loader=yaml.Loader) on the raw POST body. yaml.Loader can construct arbitrary Python objects from YAML tags, so a crafted manifest can achieve remote code execution. Fix: use yaml.safe_load.
- [HIGH][authz] app/views.py:34-36 — bulk_import is guarded only by @login_required, but it drives the same mutation (store.adjust_qty) that the adjust route guards with both @login_required and @manager_required. Any authenticated non-manager can bulk-adjust inventory quantities through this path. Fix: add @manager_required to bulk_import, matching adjust.
- [CRITICAL][injection] app/views.py:47-48 — print_label runs subprocess.run("labelctl print --sku " + sku, shell=True) where sku = request.form["sku"] is unescaped user input concatenated into a shell command string. Fix: call with an argument list and no shell.
- [CRITICAL][injection] app/views.py:56-57 — restore_prefs runs pickle.loads(bytes.fromhex(blob)) where blob comes directly from the client-supplied prefs cookie. Pickle deserialization of attacker-controlled bytes allows arbitrary code execution. Fix: never unpickle untrusted input; use JSON or a signed cookie value.
- [CRITICAL][injection] app/views.py:64-65 — welcome builds render_template_string("<h2>Welcome back, " + name + "</h2>") where name is a query parameter. Because the user input is concatenated into the template source before Jinja2 parses it, this is server-side template injection, which can lead to remote code execution. Fix: pass name as a template variable instead of concatenating it.
- [CRITICAL][secrets] app/__init__.py:8 — app.config["SECRET_KEY"] is set to a hardcoded literal string, used unconditionally. Since this key signs the Flask session cookie that login_required and manager_required rely on, anyone who knows this value can forge a session with any user_id and role=manager, bypassing all authorization. Fix: load SECRET_KEY from an environment variable or secret manager, use a strong random value per deployment, and rotate it.
- [CRITICAL][secrets] app/settings.py:10 — PARTNER_TOKEN is hardcoded as a literal string with a live-looking prefix, committed to source rather than read from the environment. Fix: load it from an environment variable or secret manager, and rotate the committed value.

4. Secrets escalation: Two hardcoded values in source look like real, in-use credentials: the Flask session-signing key in app/__init__.py:8 and a partner integration API token in app/settings.py:10. Neither value is reproduced here. Both should be treated as compromised and rotated.

5. Noticed but out of scope:
- app/views.py:73 — requests.post(PARTNER_WEBHOOK, json=payload, timeout=5, verify=False) sends PARTNER_TOKEN with TLS certificate verification disabled, which risks exposing that token to a man-in-the-middle. Doesn't fit the three defined categories (not logging/hardcoding), but worth a look.
- No CSRF protection is visible on any state-changing POST route.
- app/views.py:30 does int(request.form["delta"]) with no error handling; combined with DEBUG being driven by an env var, an unhandled exception would show the Werkzeug interactive debugger if FLASK_DEBUG=1 were ever set in production.

6. Beyond what was asked: none.
