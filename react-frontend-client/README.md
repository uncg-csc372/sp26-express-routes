# Using Google OAuth
- Clone the repo.
- Create OAuth 2.0 Client credentials at console.cloud.google.com.
  - Authorized JavaScript origins (where the login request will be originating from, in this case our React client):
  ```
  http://localhost:5173
  ```
  - Authorized redirect URIs (the subroutine to take users through authentication, in this case our auth routes in the Express backend):
  ```
  http://localhost:3000/auth/google/callback
  ```

## Backend Setup
- Create a new .env file for the express server.
- Add the ClientID and Client Secret from your Google App credentials.
- Add your Neon connection string.
- Add a CLIENT_BASE_URL property to be used for CORS for the frontend.
```
DATABASE_URL='NEON STRING'
clientID='clientIDFromGoogleCloud'
clientSecret='clientSecretFromGoogleCloud'
CLIENT_BASE_URL='http://localhost:5173'
```
- Run `npm install`
- Run `node server.js` and ensure the Express app is running at http://localhost:3000/

## Frontend Setup
- Navigate to the react-client subfolder
```
cd react-client
```
- Add a new .env file for the React client.
- Add a VITE_BACKEND_API_BASE_URL property.
```
VITE_API_URL =http://localhost:3000
```
- Run `npm install`.
- Run `npm run dev`
- Access the app at http://localhost:5173
