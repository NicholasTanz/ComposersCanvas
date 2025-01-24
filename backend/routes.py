from flask import Flask

def register_routes(app : Flask):
    @app.route("/")
    def check():
        return "backend is up!"

    # this route will be used to accept a username, password and email and create a new user. 
    # it will also hash the password before storing it in the database and assert that an existing user doesn't already exist with the same username or email.
    @app.route('/register', methods=['POST'])
    def register():
        pass

    # this route will be used to accept a username and password and authenticate the user.
    # it will also return a JWT token to the user if the authentication is successful.
    @app.route('/login', methods=['POST'])
    def login():
        pass

    # this route will be used to accept a composition and store it in the database.
    @app.route('/store_composition', methods=['POST'])
    def store_composition():
        pass

    # this route will be used to accept all available compositions and return them to the user.
    @app.route('/get_compositions', methods=['GET'])
    def get_compositions():
        pass
