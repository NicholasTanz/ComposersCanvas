# Composers Canvas Frontend

The Frontend of Composers Canvas is built using Vue.js and handles creating compositions, playback of compositions, and rendering sheet music.

## Setting up the environment:
1. change into this directory
```sh
cd frontend
```

2. install dependencies
```sh
npm install
```

3. start the frontend in development mode. 
```sh
npm run dev
```     

## Running the tests and linters:

1. (TODO)


## Frontend Repository Structure:

- `src` - contains the source code for the frontend. It can be broken down as follows:
  - `assets/` - Contains static assets like images, fonts, etc.
  - `components/` - Contains Vue components that are reused throughout different views. We don't anticipate many components in this project. 
  - `router/` - Contains the Vue router configuration. It defines the routes for the frontend. (e.g., /login, /signup, /compositions).  
  - `stores/` - Contains the Vuex store configuration. They define state management for the frontend. (e.g., JWT token).
  - `views/` - Contains the views for the frontend. These are the main pages that the user interacts with. (e.g., Login, Signup, Compositions). They contain a section for the template (html), script (js), and style (css).
  - `App.vue` - The main Vue component.
  - `main.js` - The entry point for the frontend.

- `index.html` - The main HTML file for the frontend.
- `dockerfile` - Contains the Dockerfile for the frontend to build the image.

## Notes:
1. Many of the files were not mentioned in the repository structure. This is because they are mainly for configuration and setup purposes. They are unlikely to be modified very often.
These files include:
- `editor` - Contains the configuration for the editor used in the frontend.
- `.gitattributes` - Contains the Git attributes for the frontend.
- `.gitignore` - Contains the Git ignore rules for the frontend.
- `.prettierrc.json` - Contains the Prettier configuration for the frontend.
- `eslint.config.js` - Contains the ESLint configuration for the frontend.
- `package-lock.json` - Contains the npm package lock file for the frontend.
- `package.json` - Contains the npm package file for the frontend.
- `vite.config.js` - Contains the Vite configuration for the frontend.
- `vitest.config.js` - Contains the Vite test configuration for the frontend.