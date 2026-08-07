Credential value withheld in every section.

Status: SECRET_FOUND

Findings:
- [CRITICAL][SECRETS] app/__init__.py:8 - hardcoded Flask SECRET_KEY, forges signed sessions incl. manager
- [CRITICAL][INJECTION] app/views.py:38 - yaml.load with yaml.Loader on request body
- [CRITICAL][INJECTION] app/views.py:57 - pickle.loads on client-supplied prefs cookie
- [CRITICAL][INJECTION] app/views.py:65 - name concatenated into render_template_string, SSTI plus XSS
- [CRITICAL][INJECTION] app/views.py:48 - sku concatenated into subprocess.run shell=True
- [HIGH][AUTHZ] app/views.py:34-41 - bulk_import omits manager_required that adjust requires
- [HIGH][INJECTION] app/store.py:14 - order_by concatenated into ORDER BY, source views.py:23
- [HIGH][SECRETS] app/settings.py:10 - PARTNER_TOKEN hardcoded literal, live-looking format
- [HIGH][SECRETS] app/views.py:73 - PARTNER_TOKEN sent with verify=False

Scope covered: all five files under app/, 135 lines, confirmed by recursive listing.
Named a boundary: app/ has no login route, so role assignment itself was not reviewable.
Noticed but out of scope: FLASK_DEBUG default is off and safe; unvalidated type access in
adjust and bulk_import is a robustness gap, not injection.
Beyond what was asked: read README.md and requirements.txt for background.
