# Vortex Onboarding

# Running the project
1. run `npm install` command in terminal to install all packages
2. run `npm run api` command in terminal to start the server that will run on http://localhost:3000
3. open `index html` file under client folder and add any script/js file as per your needs.

# Task 1 - Implementing Login and Register
##### First task is related to providing some simple UI for logging and registering user into our system. Once user is logged in successfully you should keep his `auth token` in some local storage of your choice (localStorage, cookies, etc).

The provided api supports the following routes for doing that
* `http://localhost:3000/auth/registers` - expects `username`, `password`, `firstName`, `lastName` in request body.
* `http://localhost:3000/auth/login` - expects `username` and `password` and returns `token` in response if valid credentials were supplied.

You would need to use some kind of http client in order to make the requests to the api. Here are some resources on http, jsonwebtoken and restful services
* [RESTFUL SERVICES](https://medium.freecodecamp.org/restful-services-part-i-http-in-a-nutshell-aab3bfedd131)
* [HOW TO PERFORM HTTP WITH FETCH API](https://medium.freecodecamp.org/a-practical-es6-guide-on-how-to-perform-http-requests-using-the-fetch-api-594c3d91a547)
* [WHAT IS JSON WEB TOKEN](https://www.youtube.com/watch?v=926mknSW9Lo)
* [5 EASY STEPS TO UNDERSTANDING JSON WEB TOKENS](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec)