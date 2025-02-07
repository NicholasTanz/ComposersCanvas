# Composers Canvas Backend

The Backend is built using Flask and handles user authentication, saving compositions, and retrieving compositions.

## Setting up the environment:
1. change into this directory
```sh
cd backend
```

2. Create a virtual environment and activate it:
```sh
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

3. Install the required packages:
```sh
pip install -r requirements.txt
```

4. Start the backend and database, we won't include the frontend in this step as it is not required for the backend to run, or expected to be needed when runnning the backend tests.:
```sh
cd .. # change back to the root directory
docker compose up backend db # start the backend and database
``` 

## Running the tests and linters:

5. Running the tests:
```sh
cd .. # change back to the root directory
pytest 
```

6. Running the linter:
```sh
cd .. # change back to the root directory
ruff check backend/
```

7. Running the security linter:
```sh
cd .. # change back to the root directory
bandit -c bandit.yaml -r backend/ # run the security linter on the backend directory
```

## Backend Repository Structure:
- `src` - Contains the source code for the backend. It can be broken down as follows
  - `__init__.py` - Initializes the backend as a Flask application.
  - `models.py` - Contains the database models for the backend. Along with database interactions.
  - `routes.py` - Contains the routes for the backend. (API Endpoints)
  - `run.py` - entry point for the backend.

- `test` - Contains the tests for the backend.
- `dockerfile` - Contains the Dockerfile for the backend to build the image.

## Notes:
1. `__init__`.py files are included in the `src` and `test` directories to make them packages, if they are not included, the directories will not be recognized as packages and cause import errors.