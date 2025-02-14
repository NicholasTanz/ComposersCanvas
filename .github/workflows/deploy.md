# insturctions for deploying our application on Google Cloud Platform (GCP).

(using google cloud run) - later on we _might_ want to use kubernetes engine for more control (I highly doubt we'll need it though.)


- switching away from AWS, as Fargate is not part of the free tier xD and we get $300 free credit on GCP. 

- we have 3 services that we need to deploy:
  - frontend
  - backend
  - database

(Currently all 3 work fine for local development - spun up using docker-compose.yaml in the root directory).

(we have 2 dockerfiles each for the backend and frontend services - one for development and one for production.) - I'd like to try and synonymize the two more, so then when we deploy to GCP it's more of a seamless transition.

frontend is the only one that works atm when deployed to GCP. (using cloud run) 