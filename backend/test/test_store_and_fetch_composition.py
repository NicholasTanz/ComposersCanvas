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
        payload = {
            "username": USER,
            "password": PASSWORD,
            "email": EMAIL
        }

        headers = {
            "Content-Type": "application/json"
        }

        _ = requests.post("http://localhost:5000/register", json=payload, headers=headers)

        yield # This is where the test will run.

        # after each test, attempt to remove the user from the database - this is a sanity check to ensure the user doesn't already exist.
        payload = {
            "username": USER,
            "password": PASSWORD
        }
        deletion_response = requests.post("http://localhost:5000/delete_user", json=payload, headers=headers)
        assert deletion_response.status_code == 200
        assert deletion_response.json()["message"] == "User removed successfully"


    def test_store_and_fetch_composition(self):
        payload = {
            "username": USER,
            "password": PASSWORD
        }
        headers = { 
            "Content-Type": "application/json"
        }
        response = requests.post("http://localhost:5000/login", json=payload, headers=headers)
        assert response.status_code == 200
        check_auth_response = requests.get("http://localhost:5000/check-auth", cookies=response.cookies)
        auth_data = check_auth_response.json()
        assert check_auth_response.status_code == 200
        assert auth_data["authenticated"]
        assert auth_data["user"] == payload["username"]

        # store a composition in the database.
        payload = {
            "composition": {
                "name": "example_composition",
                "scoreTitle": "example_score_title",
                "timeSignatureNumerator": 4,
                "timeSignatureDenominator": 4,
                "currentKeySignature": "C",
                "notes": ["dummy_note_1", "dummy_note_2"]
            }
        }
        headers = {
            "Content-Type": "application/json"
        }

        response_store_comp = requests.post(URL_store, json=payload, headers=headers, cookies=response.cookies)
        assert response_store_comp.status_code == 200
        assert response_store_comp.json()["message"] == "Composition saved successfully"

        # get all compositions from the database.
        response = requests.get(URL_get, headers=headers, cookies=response.cookies)
        assert response.status_code == 200
        assert response.json()[0]["name"] == payload["composition"]["name"]
        assert response.json()[0]["scoreTitle"] == payload["composition"]["scoreTitle"]
        assert response.json()[0]["timeSignatureNumerator"] == payload["composition"]["timeSignatureNumerator"]
        assert response.json()[0]["timeSignatureDenominator"] == payload["composition"]["timeSignatureDenominator"]
        assert response.json()[0]["currentKeySignature"] == payload["composition"]["currentKeySignature"]
        assert response.json()[0]["notes"] == payload["composition"]["notes"]
    
    def test_store_composition_then_update(self):
        payload = {
            "username": USER,
            "password": PASSWORD
        }
        headers = { 
            "Content-Type": "application/json"
        }
        response = requests.post("http://localhost:5000/login", json=payload, headers=headers)
        assert response.status_code == 200
        check_auth_response = requests.get("http://localhost:5000/check-auth", cookies=response.cookies)
        auth_data = check_auth_response.json()
        assert check_auth_response.status_code == 200
        assert auth_data["authenticated"]
        assert auth_data["user"] == payload["username"]

        # store a composition in the database.
        payload = {
            "composition": {
                "name": "example_composition",
                "scoreTitle": "example_score_title",
                "timeSignatureNumerator": 4,
                "timeSignatureDenominator": 4,
                "currentKeySignature": "C",
                "notes": ["dummy_note_1", "dummy_note_2"]
            }
        }
        headers = {
            "Content-Type": "application/json"
        }

        response_store_comp = requests.post(URL_store, json=payload, headers=headers, cookies=response.cookies)
        assert response_store_comp.status_code == 200
        assert response_store_comp.json()["message"] == "Composition saved successfully"

        # get all compositions from the database.
        response_get_comps = requests.get(URL_get, headers=headers, cookies=response.cookies)
        assert response_get_comps.status_code == 200
        assert response_get_comps.json()[0]["name"] == payload["composition"]["name"]

        # update the composition in the database.
        payload["composition"]["scoreTitle"] = "updated_example_composition"
        response_store_comp = requests.post(URL_store, json=payload, headers=headers, cookies=response.cookies)
        assert response_store_comp.status_code == 200
        assert response_store_comp.json()["message"] == "Composition updated successfully"

        # get updated composition from the database.
        response_get_comps = requests.get(URL_get, headers=headers, cookies=response.cookies)
        assert response_get_comps.status_code == 200
        assert response_get_comps.json()[0]["scoreTitle"] == payload["composition"]["scoreTitle"]

        # delete the user from the database.
        payload = {
            "username": USER,
            "password": PASSWORD
        }

    
    def test_invalid_store_composition_no_composition(self):
        # test invalid store composition - no composition provided.
        payload = {
            "composition": None
        }
        headers = {
            "Content-Type": "application/json"
        }

        response_store_comp = requests.post(URL_store, json=payload, headers=headers)
        assert response_store_comp.status_code == 400
        assert response_store_comp.json()["message"] == "Composition is required"

        # always delete the user from the database after the test.
        payload = {
            "username": USER,
            "password": PASSWORD
        }
    
    def test_invalid_store_composition_not_logged_in(self):
        # test invalid store composition - not logged in.
        payload = {
            "composition": {
                "name": "example_composition",
                "scoreTitle": "example_score_title",
                "timeSignatureNumerator": 4,
                "timeSignatureDenominator": 4,
                "currentKeySignature": "C",
                "notes": ["dummy_note_1", "dummy_note_2"]
            }
        }
        headers = {
            "Content-Type": "application/json"
        }

        response_store_comp = requests.post(URL_store, json=payload, headers=headers)
        assert response_store_comp.status_code == 401
        assert response_store_comp.json()["message"] == "Unauthorized - please login or create an account."

        payload = {
            "username": USER,
            "password": PASSWORD
        }