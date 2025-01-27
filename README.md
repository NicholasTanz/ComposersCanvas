# ComposersCanvas - A web application that allows users to create sheet music and play it back.
## Frontend

The frontend of ComposersCanvas is built using [React](https://reactjs.org/).

## Backend

The backend of ComposersCanvas is powered by [Flask](https://flask.palletsprojects.com/).
 by [Flask](https://flask.palletsprojects.com/).

## Environment Setup

To set up the environment, create a `.env` file in the root directory of the project and add the following variables:

```
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=database_name
DB_URI=your_database_uri
```

## Docker Commands

To start the application using Docker, run:

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

## Backend Repository Setup

To set up the backend, navigate to the backend directory and follow the instructions provided in the `README.md` file located there.

## Running Backend Tests

To run the backend tests, navigate to the backend directory and execute the following command while the Docker containers are running:

```sh
pytest
```


## Accessing the PostgreSQL Database

To access the PostgreSQL database via the terminal, use the following command:

```sh
docker exec -it composerscanvas-db-1 psql -U <username> -d <database_name>
```