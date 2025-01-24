from flask import Flask, request, jsonify
from .models import checkUserExists, addUser, removeUser
from werkzeug.security import generate_password_hash, check_password_hash


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
        
        return jsonify({"message": "Login successful"}), 200


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
        pass

    # this route will be used to accept all available compositions and return them to the user.
    @app.route('/get_compositions', methods=['GET'])
    def get_compositions():
        pass