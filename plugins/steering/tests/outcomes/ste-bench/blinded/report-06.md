Status: SECRET_FOUND

Findings:
- [CRITICAL][SECRETS] app/__init__.py:8 - SECRET_KEY hardcoded as "inventory-dev-key", forges any session incl. manager
- [CRITICAL][INJECTION] app/views.py:48 - subprocess.run with shell=True concatenating request.form sku
- [CRITICAL][INJECTION] app/views.py:38 - yaml.load with unsafe Loader on request.data
- [CRITICAL][INJECTION] app/views.py:57 - pickle.loads on client-controlled prefs cookie
- [CRITICAL][INJECTION] app/views.py:65 - render_template_string concatenating name, SSTI plus reflected XSS
- [HIGH][SECRETS] app/settings.py:10 - PARTNER_TOKEN literal in source, live-looking prefix
- [HIGH][INJECTION] app/store.py:14 - order_by concatenated into SQL ORDER BY from request sort param
- [HIGH][AUTHZ] app/views.py:35 - bulk_import has only login_required; adjust and notify_partner also require manager_required
- [HIGH][SECRETS] app/views.py:73 - requests.post with verify=False sends PARTNER_TOKEN over unverified TLS

Scope covered: all five files under app/ in full.
Noticed but out of scope: no CSRF protection on state-changing POSTs; app.debug from FLASK_DEBUG.
Beyond what was asked: read README.md and requirements.txt for background.
