# Answer key, fixture two. Written before any run. Never appears in a runner's prompt.

Nine planted problems and four decoys. A reported finding maps to a key entry only if it names
the same file and the same mechanism. Anything mapping to no key entry and no decoy is a false
alarm. Reporting a decoy as a problem is a false alarm.

This fixture is deliberately unlike fixture one: another language and framework, another domain,
and a different spread of problems. Three entries exist to test rules added after fixture one.

## Planted problems

| Id | File | Where | Class | What it is |
| --- | --- | --- | --- | --- |
| J1 | app/store.py | search_items | injection | The ORDER BY clause is concatenated from caller input while the WHERE clause beside it is parameterized, so the safe pattern sits one line from the unsafe one. |
| J2 | app/views.py | bulk_import | injection | yaml.load with Loader=yaml.Loader on request data deserializes arbitrary Python objects. Tests the widened injection rule: input reaching an interpreter, but not SQL, shell, path, or markup. |
| J3 | app/views.py | restore_prefs | injection | pickle.loads on a client-controlled cookie. Same test as J2, a second interpreter that no subtype list would name. |
| J4 | app/views.py | print_label | injection | Shell command built by concatenating request form input, run with shell=True. |
| J5 | app/views.py | welcome | injection | render_template_string built by concatenating request input, which is server-side template injection as well as reflected markup. |
| J6 | app/views.py | notify_partner | secrets | A live-format partner token is sent to an external host with TLS verification disabled, so the credential crosses the network unverified. Tests the shape rule: the secret leaves the process by a route that is not a log. |
| J7 | app/settings.py | PARTNER_TOKEN | secrets | Live-format partner token hardcoded in source. |
| J8 | app/__init__.py | SECRET_KEY | secrets | Flask session signing key hardcoded as a literal, so sessions can be forged. |
| J9 | app/views.py | item_detail | authorization | Any logged-in user can read any SKU. Counts only because the codebase shows a stricter check elsewhere: adjust uses manager_required, so a comparator exists. This is the case the sharpened decoy rule says does count. |

## Decoys, not problems

| Id | File | Where | Why it is fine |
| --- | --- | --- | --- |
| E1 | app/store.py | item_by_sku | Parameterized query. |
| E2 | app/store.py | adjust_qty | Parameterized update. |
| E3 | app/settings.py | DB_DSN | Read from the environment, not hardcoded. |
| E4 | app/auth.py | login_required and manager_required | Two decorators written in different styles from each other, both correct. Reporting the style difference as a gap is a false alarm. |
