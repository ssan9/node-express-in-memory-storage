const express = require('express');

// creating a new Express router instance to modularize different router end points
const router = express.Router();

// using body-parser's JSON-parser to parse the JSON data sent by clients
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const { Musicians } = require('./models'); // importing our musicians model from another module. From the perspective of router.js, Musicians is just an interface we can use to retrieve the current state of our application's musicians list.
const {
  musiciansSchema,
  musiciansUpdateSchema,
} = require('./schema-validation/schema-validation');
const { validation } = require('./schema-validation/validation-middleware');

// getting all musicians
router.get('/', async (req, res) => {
  const musicians = await Musicians.get(); // this can also be written as return Musicians.get().then(musicians => res.json(musicians));
  res.json(musicians); // so whenever we have to call a method which has promise to get the result we need to call it in this format
}); // in promises the data is available only at the next .then statement, that's why in the combineData funcion we didn't get the value but we are getting it's value here through this .then method or async/await function
// here we have a server that exposes an endpoint at /. When a GET request is made to that endpoint, our server responds by calling the .get() method on a Musicians model that we have imported. Notice that the API layer doesn't have any conception of how the Musicians model goes about getting the data. The API layer just knows that the Musicians model has a get method that can be called to retrieve a list of stored musicians. Models are where the logic for sourcing and manipulating data should live.
// When a request is made to /musicians, our app responds by serializing (that is, transforming to JSON) the data returned by Musicians.get(), which will be a list of the current musicians items.
// Our endpoint knows that it should call Musicians.get(), but it doesn't have any conception of how Musicians.get() is implemented. In general, we want to strive for a thin API layer, concentrating complicated logic in our models
// We then add individual routes to this router. This code is almost identical to what we used to have in index.js. The key difference is that the endpoint here is just /, not /recipes. Recall that inside the updated index.js, we route requests to /musicians to this router.
// This handler, in turn, points to the models.js module, and the request is routed to get function in models.js. Finally, the response is sent back to the client in a JSON array that includes each musician.

// getting musicians by id
router.get('/:id', async (req, res) => {
  try {
    const musicians = await Musicians.getById(req.params);
    if (musicians.id) res.json(musicians); // if musician id exists, then only return data
  } catch (err) {
    res.status(400).json({
      errorMessage: 'Musician does not exist',
    });
  }
});

// passing through bodyParser middleware and validation middleware before creating/adding musician data
router.put('/', jsonParser, validation(musiciansSchema), async (req, res) => {
  // jsonParser middleware is only usedwhen we
  const newMusician = await Musicians.create(
    // have incoming data through post or put requests.
    req.body.id, // Our PUT endpoint will need to be able to parse data about new musicians items from requests, and it will need to call the Musicians.create to create a new item. It will also need to return a JSON object representing the newly created object and the right status code.
    req.body.firstName, // When a client makes a POST request to /musicians, we first validate the request body, ensuring that id, firstname, lastname, genre and songs have been supplied. If these values are missing, we log an error and send back a status code 400, along with a helpful error message.
    req.body.lastName, // If the client has sent valid data, we call the Musicians.create method with data from the request body. create() returns the newly created item, and we respond by sending a 201 status code, along with a JSON object representing the new item.
    req.body.genre
  );
  res.status(201).json(newMusician); // no error message if values are missing? Maybe yup validation is taking care of that
});

// router.delete('/:id', (req, res) => {
//   Musicians.delete(req.params.id); // As with create and read operations, our DELETE endpoint will use the URL /musicians, but will include a path variable for the id of the musicians item to be deleted.
//   res.status(204).end();
// }); // This API endpoint will need to call Musicians.delete(), supplying the id of the item to be deleted. We retrieve the id of the item to be deleted from the request params, and then call Musicians.delete() with that value. We send back a blank response with a 204 status code.

// updating musician data by id
router.put(
  // To update existing musicians items, we'll reuse our /musicians endpoint, but we'll add a path variable for the id of the to-be-updated resource.
  '/:id', // Like our POST endpoint, our PUT endpoint will need to be able to parse data about updated musicians items. It will need to validate the data sent by the client, and if all is right, call Musicians.update with the updated data.
  jsonParser,
  validation(musiciansUpdateSchema), // validation schema middleware to give errors if parameters with wrong data types are passed in the body
  async (req, res) => {
    try {
      // calling the update function to update the old values with the new values if the values of path id and request body id match
      Musicians.update({
        // For put requests no need to put id in the body when sending data to update
        id: req.params.id, // like our PUTT endpoint, we're validating the data to ensure a.) that the required fields have been sent, and b.) that the id values in the request body and request path URL match. Assuming the request is valid, this endpoint calls Musicians.update() with the updated data. In the success case, this endpoint returns a 200 HTTP status code with the targeted id
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        genre: req.body.genre,
        songs: req.body.songs,
      });

      return res.status(200).json({
        id: `${req.params.id}`,
      });
    } catch (err) {
      return res.status(400).json({
        errorMessage: err,
      });
    }
  }
);

module.exports = { router };
