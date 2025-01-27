import pytest
import requests

URL = "http://localhost:5000/delete_user"
USER = "example_user"
PASSWORD = "securepassword123"
EMAIL = "example@example.com"


class TestRegister:
    @pytest.fixture(autouse=True)
    def run_around_tests(self):
        # Before each test, attempt to create a user in the database.
        payload = {
            "username": USER,
            "password": PASSWORD,
            "email": EMAIL
        }

        headers = {
            "Content-Type": "application/json"
        }

        _ = requests.post("http://localhost:5000/register", json=payload, headers=headers)

    def test_validUserDeletion(self):
        payload = {
            "username": USER,
            "password": PASSWORD,
        }
        headers = {
            "Content-Type": "application/json"
        }


        response = requests.post(URL, json=payload, headers=headers)
        assert response.status_code == 200
        assert response.json()["message"] == "User removed successfully"
    

    def test_invalidUserDeletion_WhenNoUsername(self):
        payload = {
            "password": PASSWORD
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(URL, json=payload, headers=headers)
        assert response.status_code == 400
        assert response.json()["message"] == "Username is required"
    
    def test_invalidUserDeletion_WhenIncorrectPassword(self):
        payload = {
            "username": USER,
            "password": "wrongpassword"
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(URL, json=payload, headers=headers)
        assert response.status_code == 400
        assert response.json()["message"] == "Invalid credentials"
    
    def test_invalidUserDeletion_WhenUserDoesntExist(self):
        payload = {
            "username": "unknown_user",
            "password": PASSWORD
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(URL, json=payload, headers=headers)
        assert response.status_code == 400
        assert response.json()["message"] == "User not found"