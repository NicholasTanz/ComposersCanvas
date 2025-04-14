
'''
After spinning up the Flask server, we can test the register endpoint by sending a POST request to the /register endpoint with a JSON payload containing the username, password, and email fields. We can use the requests library to send the HTTP request.
'''

import pytest
import requests

URL = "http://localhost:5000/register"
USER = "example_user"
PASSWORD = "Securepassword123"
EMAIL = "example@example.com"


class TestRegister:

    @pytest.fixture(autouse=True)
    def run_around_tests(self):
        # Before each test, attempt to remove the user from the database - this is a sanity check to ensure the user doesn't already exist.
        payload = {
            "username": USER,
            "password": PASSWORD
        }

        headers = {
            "Content-Type": "application/json"
        }

        _ = requests.post("http://localhost:5000/delete_user", json=payload, headers=headers)

    def test_validRegistration(self):
        payload = {
            "username": USER,
            "password": PASSWORD,
            "email": EMAIL
        }
        headers = {
            "Content-Type": "application/json"
        }


        response = requests.post(URL, json=payload, headers=headers)
        assert response.status_code == 200
        assert response.json()["message"] == "User created successfully"
    
    def test_invalidRegistration_NoUsername(self):
        payload = {
            "password": PASSWORD,
            "email": EMAIL
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(URL, json=payload, headers=headers)
        assert response.status_code == 400
        assert response.json()["message"] == "All fields are required"

    def test_invalidRegistration_NoPassword(self):
        payload = {
            "username": USER,
            "email": EMAIL
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(URL, json=payload, headers=headers)
        assert response.status_code == 400
        assert response.json()["message"] == "All fields are required"

    def test_invalidRegistration_NoEmail(self):
        payload = {
            "username": USER,
            "password": PASSWORD
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(URL, json=payload, headers=headers)
        assert response.status_code == 400
        assert response.json()["message"] == "All fields are required"

    def test_invalidRegistration_ExistingUser(self):
        payload = {
            "username": USER,
            "password": PASSWORD,
            "email": EMAIL
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(URL, json=payload, headers=headers)
        assert response.status_code == 200

        # now try to register the same user again
        response = requests.post(URL, json=payload, headers=headers)
        assert response.status_code == 400
        assert response.json()["message"] == "Username or email already taken"

    def test_invalidRegistration_ExistingEmail(self):
        payload = {
            "username": "another_user",
            "password": PASSWORD,
            "email": EMAIL
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(URL, json=payload, headers=headers)
        assert response.status_code == 200

        # now try to register the same email with a different user
        payload["username"] = USER
        response = requests.post(URL, json=payload, headers=headers)
        assert response.status_code == 400
        assert response.json()["message"] == "Username or email already taken"

        # remove the user we just created
        payload = {
            "username": "another_user",
            "password": PASSWORD
        }

        deletion_response = requests.post("http://localhost:5000/delete_user", json=payload, headers=headers)
        assert deletion_response.status_code == 200
        assert deletion_response.json()["message"] == "User removed successfully"

    def test_invalidRegistration_WeakPassword(self):
        payload = {
            "username": USER,
            "password": "weak",
            "email": EMAIL
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(URL, json=payload, headers=headers)
        assert response.status_code == 400
        assert response.json()["message"] == "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"