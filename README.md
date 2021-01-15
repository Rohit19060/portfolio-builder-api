<h1 align="center"><a href="https://enigmatic-tundra-24310.herokuapp.com">Portfolio Builder API</a></h1>

<h3 align="center">You can build your portfolio in couple of minutes</h3>

## Table of Contents

- [Links](#links)
- [Available Scripts](#available-scripts)
- [Built With](#built-with)
- [Future Updates](#future-updates)
- [Contact](#author)

## Links

- [Live View](https://portfolio-builder-client.vercel.app/)

- [Repo](https://github.com/Rohit19060/portfolio-builder-client)

- [Api Endpoint](https://enigmatic-tundra-24310.herokuapp.com)

- [Api Endpoint Repo](https://github.com/Rohit19060/portfolio-builder-api)

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

## Schema

### Portfolio_user

```js
{
    id: {
        type:String,
        unique:true
    },
    user_name: {
    type: String,
    required: true,
    unique: true
  },
    password: {
    type: String,
    required: true,
  },
   date_created:{
    type: Date,
    default: Date.now
  },
   date_modified:{
    type: Date,
    default: Date.now
  }
}
```

### Portfolio_data

```js
{
    id: {
        type:String,
        unique:true
    },
    name: {
    type: String,
    required: true,
    unique: true
  },
   portfolio_created: {
     type: Date,
    default: Date.now
  },
  projects:{
    type: Array,
    required: true,
  },
  organization:{
     type: Array,
    required: true,
  }
}
```

## API Overview

```text
/api
.
├── /auth
│   └── POST
│       └── /login
├── /users
│   └── POST
│       └── /
├── /templates
│   └── GET
│       ├── /:token
│       └── /count
│   └── POST
│       └── /data
```

### POST `/api/auth/login`

```js
// req.body
{
  user_name: String,
  password: String
}

// res.send
{
  authToken: String
}
```

### POST `/api/users/`

```js
// req.query
{
  user_name: String,
  password: String
}

// res.json
{
    id:String,
    user_name:String,
    date_created: Date,
 };
```

### GET `api/templates/:token`

```JS
// req.query
{
  token: JWT Token
}

// res.write
{
 Content:HTML
}
```

### GET `api/templates/count`

```JS
// res.json
{
    count:Number
}
```

### POST `api/templates/data`

```JS
// req.body
{
    name:String,
    projects:String,
organization:String,
token: JWT Token
}
```

## Built With

- [Node](https://nodejs.org/en/) - Run-time environment
- [Express](https://expressjs.com/) - Web application framework
- [JWT](https://jwt.io/) - Authentication
- [Mocha](https://mochajs.org/) - Testing
- [Chai](https://www.chaijs.com/) - Testing
- [Knex.js](http://knexjs.org/)- for interfacing with the PostgreSQL database
- [React](https://reactjs.org/)- for building user interfaces

## Future Updates

- To add Html Editor
- To add Loading screen while fetching the data

## Author

**Rohit Jain**

- [GitHub](https://github.com/rohit19060)
- [Email](rohitjain19060@gmail.com)
- [Website](https://kingtechnologies.in)

## 🤝 Support

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](issues/).

Give a ⭐️ if you like this project!

## About

API Endpoint for portfolio builder client, it is hosted on Heroku
This is for capstone final project
This API endpoint provides user authentication and authorization with serving HTML templates when requested by the client.
we have defined a couple of route handlers for different request and with different methods handlers to serve them securely as well.
In this 3 main API routes are auth, templates and users.

I am using knex for Postgres builder this provides a great and simple way to write queries.
I am using a couple of basic modules to make strong and simple API endpoint for efficient working. Some of them are here for security purposes like bcrypt and jwt.
