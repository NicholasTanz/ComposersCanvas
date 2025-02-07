# Composers Canvas - A web application that allows users to create sheet music and play it back.
## Frontend

We utilize Vue.js for the frontend of Composers Canvas. At a high level, the frontend handles creating compositions, playback of compositions, and rendering sheet music.
To see more information about the frontend setup, view the frontend [README](frontend/README.md).

## Backend

We utilize Flask for the backend of Composers Canvas. At a high level, the backend handles user authentication, saving compositions, and retrieving compositions.
To see more information about the backend setup, view the backend [README](backend/README.md).

## Environment Setup

We .gitignore the .env file, so you will need to create your own .env file in the root directory of the project. The .env file should contain the following variables and values for local development:

```sh

POSTGRES_USER=username
POSTGRES_PASSWORD=password
POSTGRES_DB=music_composer
DATABASE_URL=postgresql://username:password@db:5432/music_composer
FLASK_RUN_HOST=0.0.0.0
FLASK_RUN_PORT=5000
SECRET_KEY = 9c77b62fd66e33db11d4e6e088d77e0d014151091fd40d85392a412a47bc4003

```

## Docker Commands

To start all three services (frontend, backend, and database), run the following command:

```sh
docker compose up
```

To stop the application, run:

```sh
docker compose down
```

To restart a specific container, use:

```sh
docker compose restart <container_name>
```

## Accessing the PostgreSQL Database

To access the PostgreSQL database via the terminal, use the following command:

```sh
docker exec -it composerscanvas-db-1 psql -U username -d music_composer
```