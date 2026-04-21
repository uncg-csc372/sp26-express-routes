# sp26-express-routes +ejs views with Google OAuth 2.0
Demo node/express with routes

# Using Google OAuth
- Clone the repo.
- Create OAuth 2.0 Client credentials at console.cloud.google.com.
  - Authorized JavaScript origins (where the login request will be originating from, in this case our Express server, since we are using SSR):
  ```
  http://localhost:3000
  ```
  - Authorized redirect URIs (the subroutine to take users through authentication, in this case our auth routes in the Express backend):
  ```
  http://localhost:3000/auth/google/callback
  http://localhost:3000/api/auth/callback/google
  ```

## Setup
- Create a new .env file at the base directory.
- Add the ClientID and Client Secret from your Google App credentials.
- Add your Neon connection string.
```
DATABASE_URL='NEON STRING'
clientID='clientIDFromGoogleCloud'
clientSecret='clientSecretFromGoogleCloud'
```
- Run `npm install`
- Run `node server.js`
- Access the app at http://localhost:3000/products
