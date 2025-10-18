from flask import Flask, jsonify
from .extensions import *
from .config import Config
from .auth import auth_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    # db.init_app(app)
    # jwt.init_app(app)
    # cors.init_app(app)

    # Health check endpoint
    @app.route("/health")
    def health_check():
        return jsonify({"status": "healthy", "service": "sigma-backend"})

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    return app
