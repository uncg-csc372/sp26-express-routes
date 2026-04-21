# sp26-express-routes
Demo node/express with routes and a React frontend client.


## Getting Started
1. Clone the repository and navigate to the project directory.
Add environment variables for the backend and frontend:
    - Create a `.env` file in the `express-backend` directory with the following content:
      ```
      DATABASE_URL='YOUR_DATABASE_URL_HERE'
      CLIENT_BASE_URL='http://localhost:5173'
      clientID='client-id-from-google-console'
      clientSecret='client-secret-from google-console'
      ```
    - Create a `.env` file in the `react-frontend-client` directory with the following content:
      ```
      VITE_API_URL=http://localhost:3000
      ```
2. Install dependencies for both the backend and frontend:
    - For the backend:
      ```bash
      cd express-backend
      npm install
      ```
    - For the frontend:
      ```bash
      cd react-frontend-client
      npm install
      ```
3. Start the backend server:
    ```bash
    cd express-backend
    node server.js
    ```
4. In a separate terminal, start the frontend development server:
    ```bash
    cd react-frontend-client
    npm run dev
    ```
5. Open your browser and navigate to `http://localhost:5173` to view the application.
