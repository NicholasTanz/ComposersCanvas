from .__init__ import create_app
from .models import db
import os

app = create_app()

# Create tables (this will create any missing tables based on models) - in the future, we will use migrations to manage the database schema.
with app.app_context():
    db.create_all()

# Run the app
if __name__ == "__main__":
    app.run(debug=True, host=os.getenv("FLASK_RUN_HOST"), port=os.getenv("FLASK_RUN_PORT"))