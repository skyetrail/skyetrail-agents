Credential value withheld in every section.

Status: SECRET_FOUND

Findings:
- [CRITICAL][SECRETS] app/__init__.py:8 - hardcoded Flask SECRET_KEY, forges any session incl. manager
- [CRITICAL][INJECTION] app/views.py:38 - yaml.load with yaml.Loader on request body
- [CRITICAL][INJECTION] app/views.py:48 - sku into subprocess.run shell=True
- [CRITICAL][INJECTION] app/views.py:57 - pickle.loads on client-supplied prefs cookie
- [CRITICAL][INJECTION] app/views.py:65 - name into render_template_string source, SSTI
- [HIGH][INJECTION] app/store.py:14 - order_by concatenated into SQL, source views.py:23 sort param
- [HIGH][AUTHORIZATION] app/views.py:34-41 - bulk_import lacks manager_required that adjust has
- [HIGH][SECRETS] app/views.py:73 - PARTNER_TOKEN sent with verify=False
- [HIGH][SECRETS] app/settings.py:10 - PARTNER_TOKEN hardcoded literal, live-looking

Scope covered: all five files under app/, 5 of 5, nothing truncated.
Noticed but out of scope: FLASK_DEBUG exposes Werkzeug debugger; no CSRF on state-changing
POSTs; SESSION_TTL_MINUTES defined but never referenced.
Beyond what was asked: none. Read README.md and requirements.txt for orientation only.
