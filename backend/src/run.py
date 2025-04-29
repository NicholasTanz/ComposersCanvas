from .__init__ import create_app
from .models import db
import os

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = create_app()

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["275 per minute"],
)

with app.app_context():
    db.create_all()

# Run the app
if __name__ == "__main__":
    app.run(debug=True, host=os.getenv("FLASK_RUN_HOST"), port=os.getenv("FLASK_RUN_PORT")) #nosec: B201