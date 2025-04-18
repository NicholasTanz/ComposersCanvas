# Composers Canvas
Composers Canvas is an open source music composition software targeted towards beginners.




## Why Composers Canvas?
Unlike many currently utilized music composition softwares, Composers Canvas is open source which allows a collaborative effort towards improvement. Additionally, Composers Canvas is meant for people who have experienced reading music but are just getting into composition. It's simplified interface is great for your first steps to avoid being overwhelmed.




## Getting Started
To spin up our application locally, you will need to have Docker installed. After installing docker, you can run the following commands in your terminal to get started.


```bash
 # to start the application
docker compose up


# to stop the application
docker compose down


# to restart a specific service
docker compose restart <service_name>


# to access the database container.
docker exec -it composerscanvas-db-1 psql -U username -d music_composer
```


1. To learn more about the backend, click [here](../backend/README.md).
2. To learn more about the frontend, click [here](../frontend/README.md).


## Need Assistance?
Feel free to open up an issue in the [issues section](https://github.com/NicholasTanz/ComposersCanvas/issues), if you need any help or have any questions.




## Maintainers
The maintainers of this project are Anjali Vanamala, Peter Kim, and Nicholas Tanzillo. Anyone is free to contribute to the project!


