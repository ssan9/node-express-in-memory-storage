const express = require('express');
const router = express.Router();
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

router.get('/:id', async (req, res) => {
  console.log('req.params.id', req.params);

  try {
    const musicians = await Musicians.getById(req.params);
    if (musicians.id) res.json(musicians);
  } catch (err) {
    res.status(400).json({
      errorMessage: 'Musician does not exist',
    });
  }
});

router.put('/', jsonParser, validation(musiciansSchema), (req, res) => {
  const newMusician = Musicians.create(
    req.body.id,
    req.body.firstName,
    req.body.lastName,
    req.body.genre
  );
  res.status(201).json(newMusician);
});

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
