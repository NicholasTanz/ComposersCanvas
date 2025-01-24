'''
After spinning up the Flask server, we can test the login endpoint by sending a POST request to the /login endpoint with a JSON payload containing the username and password fields. We can use the requests library to send the HTTP request.
'''

import requests

def test_login():
    url = "http://localhost:5000/login"
    payload = {
        "username": "example_user",
        "password": "securepassword123"
    }


    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)
    print(response.status_code)
    print(response.json())