from flask import Flask
from .views import bp
from .settings import DEBUG


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "inventory-dev-key"
    app.debug = DEBUG
    app.register_blueprint(bp)
    return app
