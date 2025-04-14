from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from sqlalchemy import JSON
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
    composition = db.Column(JSON, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'composition': self.composition
        }

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
        # also need to remove all compositions by the user. 
        # Since the user_id is a foreign key in the Composition table.
        compositions = Composition.query.filter_by(user_id=getUserId_FromUsername(username)).all()
        for comp in compositions:
            db.session.delete(comp)
        db.session.commit()

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
        # also checks if composition already exists for the user.
        compositions = Composition.query.filter_by(user_id=userId).all()
        dict_compositions = [composition.to_dict() for composition in compositions]
        for comp in dict_compositions:
            if comp["composition"]["name"] == composition["name"]:
                # update the existing composition
                comp_to_update = Composition.query.filter_by(id=comp["id"]).first()
                comp_to_update.composition = composition
                db.session.commit()
                return jsonify({"message": "Composition updated successfully"}), 200

        # for new compositions. 
        new_comp = Composition(user_id=userId, composition=composition)
        db.session.add(new_comp)
        db.session.commit()
        return jsonify({"message": "Composition saved successfully"}), 200

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

def getCompositions_byUserId(userId):
    '''

    This function will get all compositions by a user id.

    Parameters:
    userId (int): The user id of the user.

    Returns:
    compositions (list): A list of compositions by the user.
    
    '''

    compositions = Composition.query.filter_by(user_id=userId).all()
    return [composition.to_dict() for composition in compositions]