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
        
        return jsonify({"message": "User created successfully"}), 200

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


def removeUser(username):
    '''
    
    This function will remove a user from the database.

    Parameters:
    username (str): The username of the user to be removed.

    Returns:
    response (json): A json response indicating the status of the operation.
    
    '''
    try:
        user = User.query.filter_by(username=username).first()
        db.session.delete(user)
        db.session.commit()
        
        return jsonify({"message": "User removed successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500


def storeComposition(composition, userId):
    '''
    
    This function will store a composition in the database.

    Parameters:
    composition (str): The composition to be stored.

    Returns:
    response (json): A json response indicating the status of the operation.
    
    '''
    try:
        new_composition = Composition(composition=composition, user_id=userId)
        db.session.add(new_composition)
        db.session.commit()
        
        return jsonify({"message": "Composition stored successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500


def getUserId_FromUsername(username):
    '''
    
    This function will get the user id from the username.

    Parameters:
    username (str): The username of the user.

    Returns:
    user_id (int): The user id of the user.
    
    '''

    user = User.query.filter_by(username=username).first()
    return user.id