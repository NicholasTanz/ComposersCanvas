
'''
After spinning up the Flask server, we can test the register endpoint by sending a POST request to the /register endpoint with a JSON payload containing the username, password, and email fields. We can use the requests library to send the HTTP request.
'''

import requests

def test_register():
    url = "http://localhost:5000/register"
    payload = {
        "username": "example_user",
        "password": "securepassword123",
        "email": "example@example.com"
    }
    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)
    print(response.status_code)
    print(response.json())