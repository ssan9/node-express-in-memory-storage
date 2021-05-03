const express = require('express'); // import express from third party libraries. This is how we make Express.js available to our application code.
// `require` is used to import third party libraries
// here we use it to import express

const { foo } = require('./foo');

const app = express(); // create a new express project; // calling `express()` creates a new app, which we set to
// the constant `app`

const port = 3000;

// Here we use destructuring assignment with renaming so the two variables
// called router (from ./users and ./auth) have different names
// For example:
// const actorSurnames = { james: "Stewart", robert: "De Niro" };
// const { james: jimmy, robert: bobby } = actorSurnames;
// console.log(jimmy); // Stewart - the variable name is jimmy, not james
// console.log(bobby); // De Niro - the variable name is bobby, not robert
const { router: musicRouter } = require('./router'); // we're importing musicRouter; // since there's no other router file, it can also be written as const musicRouter = require('./musicRouter');
// or const { musicRouter } = require('./router'); and export { musicRouter } from router.js

app.get('/', (req, res) => res.send(`Hello World! ${foo()}`)); // here we have a server that exposes an endpoint at /.

// mounting the router as middleware at path /musicians
app.use('/musicians', musicRouter); // We then use app.use to route requests to the router. This code says that any request to /musicians should be routed to the musicRouter.
// This code says that any request to /musicians should be routed to the musicRouter.
// When the page loads, the client sends a GET request to the server for musicians.
// That request passes through our logging middleware. Then the request is matched to the /musicians endpoint. This request handler, app.use('/musicians', musicRouter);, points to the router.js module. Next, the request is matched with the handler in router.js:

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`)); // // listen for requests and log when you've started doing it

module.exports = app;
