from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# example route (remove later)
@app.route('/') 
def home():
    return "Backend is up!"

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000) # nosec
