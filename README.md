# Election Platform

This repository consists of two projects: `election-platform-frontend` and `election-platform-backend`. The `election-platform-frontend` project is built with Create React App, while the `election-platform-backend` is a standard Express backend.

## Frontend (Create React App)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Run Frontend

Navigate to the `election-platform-frontend` directory:

```bash
cd election-platform-frontend
```

Before running the frontend, ensure you have the following environment variables set in a `.env` file in the `election-platform-frontend` directory:

```env
REACT_APP_API_URL=        # Specify the API URL for the frontend
REACT_APP_AUTH_URL=       # Specify the authentication URL for the frontend
REACT_APP_SUPABASE_PROJECT=   # Specify the Supabase project for the frontend
REACT_APP_SUPABASE_PROJECT_ID=   # Specify the Supabase project ID for the frontend
REACT_APP_SUPABASE_PASSWORD=   # Specify the Supabase password for the frontend
REACT_APP_SUPABASE_API_KEY=   # Specify the Supabase API key for the frontend
SUPABASE_JWT_SECRET=      # Specify the Supabase JWT secret for the frontend
REACT_APP_SUPABASE_URL=   # Specify the Supabase URL for the frontend
```

Then, in the project directory, you can run:

```bash
npm install
npm start
```

This will install dependencies and start the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Backend (Express)

For the backend, navigate to the `election-platform-backend` directory:

```bash
cd election-platform-backend
```

Before running the backend, ensure you have the following environment variables set in a `.env` file in the `election-platform-backend` directory:

```env
PORT=   # Specify the port on which the Express server will run

# MongoDB
MONGO_USER=   # MongoDB username
MONGO_PASS=   # MongoDB password
MONGO_URI=    # MongoDB connection URI

# Supabase
SUPABASE_API_KEY=   # Supabase API key
SUPABASE_URL=       # Supabase URL
```

### Run Backend

In the backend directory, run:

```bash
npm install
npm start
```

This will install dependencies and start the Express server. The backend will run on http://localhost:3001.
