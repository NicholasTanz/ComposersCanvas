'''
After spinning up the Flask server, we can test the login endpoint by sending a POST request to the /login endpoint with a JSON payload containing the username and password fields. We can use the requests library to send the HTTP request.
'''
import requests
URL = "http://localhost:5000/login"

class TestLogin:
    def test_validLogin(self):
        # create a user - if it already exists - that is fine for this test.
        payload = {
            "username": "example_user",
            "password": "securepassword123",
            "email": "myemail@gmail.com" 
        }

        headers = {
            "Content-Type": "application/json"
        }
        response = requests.post("http://localhost:5000/register", json=payload, headers=headers)

        # Login with the user we just created.
        payload = {
            "username": "example_user",
            "password": "securepassword123"
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(URL, json=payload, headers=headers)
        
        assert response.status_code == 200
        assert response.json()["message"] == "Login successful"
    
    def test_invalidLogin_NoUsername(self):
        payload = {
            "password": "securepassword123"
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(URL, json=payload, headers=headers)
        
        assert response.status_code == 400
        assert response.json()["message"] == "All fields are required"
    
    def test_invalidLogin_NoPassword(self):
        payload = {
            "username": "example_user"
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(URL, json=payload, headers=headers)
        
        assert response.status_code == 400
        assert response.json()["message"] == "All fields are required"
    
    def test_invalidLogin_UserDoesntExist(self):
        payload = {
            "username": "unknown_user",
            "password": "wrongpassword"
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(URL, json=payload, headers=headers)
        
        assert response.status_code == 401
        assert response.json()["message"] == "Invalid credentials"
    
    def test_invalidLogin_IncorrectPassword(self):
        payload = {
            "username": "example_user",
            "password": "wrongpassword",
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(URL, json=payload, headers=headers)
        assert response.status_code == 401
        assert response.json()["message"] == "Invalid credentials"