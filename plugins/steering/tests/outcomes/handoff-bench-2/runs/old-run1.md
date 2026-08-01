# Bench 2 run: old prompt, run 1

## Security Review — fixture/app/

### Injection Risks
- **Critical — OS command injection**, views.py:48 (print_label): sku from request.form["sku"] is string-concatenated into subprocess.run("labelctl print --sku " + sku, shell=True). Any shell metacharacter yields arbitrary command execution. Use shell=False with an argument list and validate sku format.
- **Critical — insecure deserialization (YAML)**, views.py:38 (bulk_import): yaml.load(request.data, Loader=yaml.Loader) uses the unsafe full loader on attacker-controlled input, allowing arbitrary Python object construction leading to RCE. Replace with yaml.safe_load.
- **Critical — insecure deserialization (pickle)**, views.py:57 (restore_prefs): pickle.loads(bytes.fromhex(blob)) on a client-supplied cookie is a direct RCE gadget-chain vector. Replace with a signed JSON-based prefs format.
- **High — Server-Side Template Injection**, views.py:65 (welcome): name from query string is concatenated directly into render_template_string, so user input becomes part of the Jinja2 template source. This is SSTI, not just XSS. Use a parameterized template.
- **High — SQL injection via ORDER BY**, store.py:14 combined with views.py:23: order_by comes straight from request.args.get("sort", ...) and is string-concatenated into the SQL. Placeholders cannot parameterize identifiers, but this must be validated against an allow-list; currently it is not, so arbitrary SQL fragments can be appended.

### Authorization Gaps
- **High — inconsistent access control**, views.py:34-41 vs 26-31: adjust() requires @manager_required, but bulk_import(), which performs the same store.adjust_qty mutation in a loop, only requires @login_required. Any authenticated non-manager can bypass the manager gate by using the bulk endpoint.
- **Medium — CSRF**, all POST routes: auth is purely session-cookie based with no CSRF token or Origin check and no SESSION_COOKIE_SAMESITE configured. A logged-in manager visiting a malicious page could have inventory silently mutated.
- **Note — session trust chain**: auth.py decorators trust session.get("user_id") and session.get("role") implicitly. This is only as strong as the session signing key; a forged cookie defeats both decorators app-wide.
- **Low — dead expiry config**: settings.SESSION_TTL_MINUTES = 30 is never wired to PERMANENT_SESSION_LIFETIME, so sessions do not expire as the constant implies.

### Secrets Handling
- **Critical — hardcoded Flask SECRET_KEY**, __init__.py:8: "inventory-dev-key" signs the session cookie. Anyone with source access can forge sessions with arbitrary user_id and role, including role=manager, bypassing every authorization check. Must come from environment and be high-entropy.
- **Critical — hardcoded live API token**, settings.py:10: PARTNER_TOKEN = "ptk_live_4c81de99a07b3f52" is a live-looking credential committed to source. Move to a secrets store and rotate it.
- **High — TLS verification disabled**, views.py:73: requests.post(..., verify=False) sends the hardcoded partner token over a connection with no certificate validation, enabling trivial MITM credential theft. Remove verify=False.
- **Low**: settings.DB_DSN (sourced from the INVENTORY_DSN env var, good practice) is defined but never used; store.py:3 hardcodes a relative sqlite3.connect path instead, so the env-configured DSN is silently ignored.

### Code Style
- views.py:5 imports current_app but never uses it.
- Dangerous low-level primitives (pickle, subprocess, yaml.Loader) are imported directly into the view layer with no isolation or wrapper.
- No request schema or type validation anywhere; adjust's int(request.form["delta"]) raises an uncaught ValueError on non-numeric input.
- No logging around security-sensitive mutations, which will hamper incident response.
- store.py docstrings are present but views.py has none; pick one convention.

### Performance
- store.py:3: a single module-level sqlite3 connection shared across threads risks database-locked errors and serializes all writes; no WAL mode or busy timeout.
- store.py:15: LIKE '%term%' with a leading wildcard cannot use an index, forcing a full table scan per search; also no pagination.
- views.py:23: no caching or limiting on the search endpoint despite being a likely high-traffic grid endpoint.
