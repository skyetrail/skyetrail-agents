Status: SECRET_FOUND

Findings:
- [CRITICAL][SECRETS] app/__init__.py:8 - hardcoded Flask SECRET_KEY, forges signed sessions, bypasses both auth decorators
- [CRITICAL][SECRETS] app/settings.py:10 - PARTNER_TOKEN live-looking credential hardcoded
- [CRITICAL][INJECTION] app/store.py:14 - sort value concatenated into SQL ORDER BY, no whitelist
- [CRITICAL][INJECTION] app/views.py:38 - yaml.load with yaml.Loader on raw request body
- [CRITICAL][INJECTION] app/views.py:48 - sku concatenated into shell command with shell=True
- [CRITICAL][INJECTION] app/views.py:57 - pickle.loads on client-controlled prefs cookie
- [CRITICAL][INJECTION] app/views.py:65 - name concatenated into render_template_string, SSTI
- [HIGH][AUTHORIZATION] app/views.py:34-36 - bulk_import mutates qty via same store.adjust_qty as adjust but lacks manager_required
- [HIGH][SECRETS] app/views.py:73 - PARTNER_TOKEN sent with verify=False, TLS verification disabled

Scope covered: all five files under app/ in full, confirmed by recursive listing first.
Noticed but out of scope: DB_DSN unused, store.py opens hardcoded sqlite path; SESSION_TTL_MINUTES unreferenced.
Beyond what was asked: read README.md and requirements.txt for background.
