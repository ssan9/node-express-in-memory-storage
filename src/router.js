const express = require('express');

// creating a new Express router instance to modularize different router end points
const router = express.Router();

// using body-parser's JSON-parser to parse the JSON data sent by clients
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Musicians } = require('./models');
const { musiciansSchema } = require('./schema-validation/schema-validation');
const { validation } = require('./schema-validation/validation-middleware');

// getting all musicians
router.get('/', async (req, res) => {
  const musicians = await Musicians.get();
  res.json(musicians);
});

// getting musicians by id
router.get('/:id', async (req, res) => {
  try {
    const musicians = await Musicians.getById(req.params);
    if (musicians.id) res.json(musicians);
  } catch (err) {
    res.status(400).json({
      errorMessage: 'Musician does not exist',
    });
  }
});

// passing through bodyParser middleware and validation middleware before creating/adding musician data
router.put('/', jsonParser, validation(musiciansSchema), (req, res) => {
  const newMusician = Musicians.create(
    req.body.id,
    req.body.firstName,
    req.body.lastName,
    req.body.genre
  );
  res.status(201).json(newMusician);
});

// updating musician data by id
router.put(
  '/:id',
  jsonParser,
  validation(musiciansSchema),
  async (req, res) => {
    try {
      const originalMusician = await Musicians.getById(req.params);
      if (!originalMusician) {
        return res.status(400).json({
          errorMessage: 'Request path id and request body id values must match',
        });
      }

      // calling the update function to update the old values with the new values if the values of path id and request body id match
      Musicians.update({
        id: req.params.id,
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
