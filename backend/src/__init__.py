from flask import Flask
from flask_cors import CORS
from .models import db
from dotenv import load_dotenv
from .routes import register_routes
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    # Enable CORS
    CORS(app, supports_credentials=True, origins=[os.getenv("CORS_ORIGINS")])

    # Register routes
    register_routes(app)

    return app