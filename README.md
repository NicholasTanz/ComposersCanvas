# Composers Canvas - A web application that allows users to create sheet music and play it back.
## Frontend

We utilize Vue.js for the frontend of Composers Canvas. At a high level, the frontend handles creating compositions, playback of compositions, and rendering sheet music.
To see more information about the frontend setup, view the frontend [README](frontend/README.md).

## Backend

We utilize Flask for the backend of Composers Canvas. At a high level, the backend handles user authentication, saving compositions, and retrieving compositions.
To see more information about the backend setup, view the backend [README](backend/README.md).


## Docker Commands for local development

Note: You should add a .env file in the frontend directory with the following content before running the docker commands.
```bash
VITE_BACKEND_URL=http://localhost:5000
```

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

## Deployment

We utilize Google Cloud Platform (GCP) for deployment. To see more information about the deployment setup, view the deployment [README](deployment/README.md).
