from backend import create_app
from backend.models import db

app = create_app()

# Create tables (this will create any missing tables based on models) - in the future, we will use migrations to manage the database schema.
with app.app_context():
    db.create_all()

# Run the app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000) 