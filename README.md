# portfolio_builder_api

<!-- TODO: set up a demo user account and indicate on the landing page how to use it. -->

<!-- GIST -->

1. As a new user: I want to sign up for an account.
2. As a new user: I want to download portfolios.
3. As a new user: I can check out multiple templates for my info.
4. As a returning user: I need to have my account and data saved.
5. As a returning user: I can see new templates and old too.
6. As a returning user: I can log in back with credentials.
7. As a admin: I can remove accounts.
8. As a admin: I can add templates.
9. As a admin: I can add accounts.
10. As a admin: i can update the site.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Start the server for serving or you can say simply run an express server on a defined port for listening. I am using node and the server is defined in src/server.js file.
Perform request to get a response from it.

### `npm run test`

Launches the test runner in the interactive watch mode.

### `npm run dev`

Run the server in development mode so if you perform and change in a file you don't need to terminate the server and start again, nodemon will handle that every time you save the file.

### `npm run migrate`

Migrate Scripts to run postgrator and for creating tables in database and if required we can undo them too by provided scripts.

### `npm run predeploy`

For running a command before deploying. this command will fix all the error before deploying the app to Heroku.

### `npm run deploy`

For deploying the API endpoint to Heroku

## About

API Endpoint for portfolio builder client, it is hosted on Heroku
This is for capstone final project
This API endpoint provides user authentication and authorization with serving HTML templates when requested by the client.
we have defined a couple of route handlers for different request and with different methods handlers to serve them securely as well.
In this 3 main API routes are auth, templates and users.

I am using knex for Postgres builder this provides a great and simple way to write queries.
I am using a couple of basic modules to make strong and simple API endpoint for efficient working. Some of them are here for security purposes like bcrypt and jwt.
