from flask import Flask, request, jsonify, make_response
from .models import checkUserExists, addUser, removeUser, storeComposition, getUserId_FromUsername
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta, timezone
import jwt
import os

def register_routes(app : Flask):
    @app.route("/")
    def health():
        return "backend is up!"

    # this route will be used to accept a username, password and email and create a new user. 
    # it will also hash the password before storing it in the database and assert that an existing user doesn't already exist with the same username or email.
    @app.route('/register', methods=['POST'])
    def register():
        # Get the data from the request
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')


        # Simple validation
        if not username or not password or not email:
            return jsonify({"message": "All fields are required"}), 400

        # Check if the username or email already exists
        existing_user = checkUserExists(username, email)
        if existing_user:
            return jsonify({"message": "Username or email already taken"}), 400

        # hash password. 
        hashed_password = generate_password_hash(password)

        # Add the new user to the database
        response = addUser(username, hashed_password, email)
        return response

    # this route will be used to accept a username and password and authenticate the user.
    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        # Simple validation
        if not username or not password:
            return jsonify({"message": "All fields are required"}), 400
        
        # Check if the user exists
        user = checkUserExists(username)
        if not user:
            return jsonify({"message": "Invalid credentials"}), 401
        
        # Check if the password is correct
        if not check_password_hash(user.password, password):
            return jsonify({"message": "Invalid credentials"}), 401
        

        # Generate JWT token
        token = jwt.encode(
             {"username": username, "exp": datetime.now(timezone.utc) + timedelta(hours=1)},
            str(os.getenv("SECRET_KEY")),
            algorithm="HS256"
            )
        
        response = make_response(jsonify({"message": "Login successful"}), 200)
        response.set_cookie(
            "jwt",
            token,
            httponly=True,
            secure=os.getenv("CORS_ORIGINS")[:5] == "https", 
            samesite="None" if os.getenv("CORS_ORIGINS")[:5] == "https" else "Lax",
        )

        return response

    # this route will be used to accept a json web token and log the user out.
    @app.route('/logout', methods=['POST'])
    def logout():
        response = make_response(jsonify({"message": "Logout successful"}))
        response.set_cookie("jwt", "", httponly=True, secure=os.getenv("CORS_ORIGINS")[:5] == "https", samesite="None" if os.getenv("CORS_ORIGINS")[:5] == "https" else "Lax")
        return response
    
    @app.route('/check-auth', methods=['GET'])
    def check_auth():
        token = request.cookies.get('jwt')

        if not token:
            return jsonify({"authenticated": False}), 401

        try:
            decoded = jwt.decode(token, str(os.getenv("SECRET_KEY")), algorithms=["HS256"])
            return jsonify({"authenticated": True, "user": decoded["username"]})
        except jwt.ExpiredSignatureError:
            return jsonify({"authenticated": False, "error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"authenticated": False, "error": "Invalid token"}), 401

    # delete a user from the database.
    @app.route('/delete_user', methods=['POST'])
    def delete_user():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        # Simple validation
        if not username:
            return jsonify({"message": "Username is required"}), 400

        # Check if the user exists
        user = checkUserExists(username)
        if not user:
            return jsonify({"message": "User not found"}), 400

        # Check if the password is correct
        if not check_password_hash(user.password, password):
            return jsonify({"message": "Invalid credentials"}), 400

        # Remove the user from the database
        response = removeUser(username)
        return response

    # TODO: Add the following routes to the Flask application.
    # this route will be used to accept a composition and store it in the database.
    @app.route('/store_composition', methods=['POST'])
    def store_composition():
        # this assumes that the user is authenticated and the json web token validation
        # has already been done (/check-auth route).

        # get the data from the request
        data = request.get_json()
        composition = data.get('composition') # we assume the composition is stored as an array of notes.

        # simple validation
        if not composition:
            return jsonify({"message": "Composition is required"}), 400
        
        # store the composition in the database - we also the need the user_id of the user who created the composition.
        token = request.cookies.get('jwt')
        decoded = jwt.decode(token, str(os.getenv("SECRET_KEY")), algorithms=["HS256"])
        userId = getUserId_FromUsername(decoded["username"])

        response = storeComposition(composition, userId)

        if response[1] != 200:
            return response
        
        return jsonify({"message": "Composition stored successfully"}), 200

    # this route will be used to accept all available compositions and return them to the user.
    @app.route('/get_compositions', methods=['GET'])
    def get_compositions():
        # this will accept a json web token to make sure the user is authenticated.
        pass