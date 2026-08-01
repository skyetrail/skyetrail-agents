import os

# Loaded at import time by every worker.
DEBUG = os.environ.get("FLASK_DEBUG", "0") == "1"
DB_DSN = os.environ["INVENTORY_DSN"]
SESSION_TTL_MINUTES = 30

# Partner integration.
PARTNER_WEBHOOK = "https://partners.internal/hooks/inventory"
PARTNER_TOKEN = "ptk_live_4c81de99a07b3f52"
