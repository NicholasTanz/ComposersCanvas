# Deployment Instructions

**Composers Canvas** uses **Cloud Run** for the deployment of both the **frontend** and **backend** services, with **Cloud SQL** handling the database. Follow the steps below to deploy the services.

---

## Frontend Deployment

1. **Frontend Configuration**  
   Deploy the built frontend image to **Cloud Run** with the following settings:

   - **Container Port:** `8080` (default)
   - **Authentication:** Select **Allow unauthenticated invocations** (since the login system is not yet implemented).
   - **Minimum Instances:** Set to `1` (no need for more than one instance at the moment).
   - **All other settings:** Leave as default.

---

## Backend Deployment

1. **Backend Configuration**  
   Deploy the backend image to Cloud Run with the following settings:

   - **Authentication:** Select **Allow unauthenticated invocations** (since the login system is not yet implemented).
   - **Docker Image:** Select the Docker image for the backend service.
   - **Service Scaling:** Set to `1` instance (no need for more than one instance at the moment).

2. **Container, Volumes, Networking, and Security Settings**  
   Configure the following under **Container(s), Volumes, Networking, Security**:

   - **Container Port:** `5000`
   - **Cloud SQL Connection:** Select the available option (this will be our database).
   - **Environment Variable:**
     - Set the `DATABASE_URL` environment variable to the connection string for the database.

---

## Side Notes

- **Number of Docker Images:**  
  We have a total of 4 Docker images—2 for the frontend and 2 for the backend. The reason for this is that we maintain separate images for local development and production environments for both services.  
  In the future, we plan to unify these images to reduce the number of images we need to manage, simplifying the deployment process.