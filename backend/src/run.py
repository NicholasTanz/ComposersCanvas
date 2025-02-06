from .__init__ import create_app
from .models import db

app = create_app()

with app.app_context():
    db.create_all()

# Run the app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000) # nosec