from flask_sqlalchemy import SQLAlchemy
from flask import jsonify

db = SQLAlchemy()


# Models. 
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

class Composition(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    composition = db.Column(db.String(120), nullable=False)

# Database Interactions. 

def addUser(username, hashed_password, email):
    '''
    
    This function will add a new user to the database.

    Parameters:
    username (str): The username of the new user.
    hashed_password (str): The hashed password of the new user.
    email (str): The email of the new user.

    Returns:
    response (json): A json response indicating the status of the operation.
    
    '''
    try:
        new_user = User(username=username, password=hashed_password, email=email)
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"message": "User created successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500


def checkUserExists(username, email=None):
    '''
    
    This function will check if a user already exists in the database.

    Parameters:
    username (str): The username of the user.
    email (str): The email of the user.

    Returns:
    existing_user (User): The user object if the user exists, None otherwise.
    
    '''
    existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
    return existing_user