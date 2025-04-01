# tests for storing and fetching compositions

import requests
import pytest

URL_store = "http://localhost:5000/store_composition"
URL_get = "http://localhost:5000/get_compositions"
USER = "example_user"
PASSWORD = "Securepassword123"
EMAIL = "example@example"

class TestStoreComposition:
    @pytest.fixture(autouse=True)
    def run_around_tests(self):
        # Before each test, attempt to create a user in the database.
        # and login with the user we just created to get the JWT token.
        payload = {
            "username": USER,
            "password": PASSWORD,
            "email": EMAIL
        }

        headers = {
            "Content-Type": "application/json"
        }

        _ = requests.post("http://localhost:5000/register", json=payload, headers=headers)

        # attempt to login. 
        payload = {
            "username": USER,
            "password": PASSWORD
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post("http://localhost:5000/login", json=payload, headers=headers)
        assert response.status_code == 200

    def test_store_composition(self):
        _ = {
            "composition": {
                "data": "example data",
            }
        }

        _ = {
            "Content-Type": "application/json"
        }