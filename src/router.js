import musiciansSchema from './schema-validation/schema-validation';

import validation from './schema-validation/validation-middleware';

const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const { Musicians } = require('./models');

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
    req.body[0].id,
    req.body[0].firstName,
    req.body[0].lastName,
    req.body[0].genre
  );
  res.status(201).json(newMusician);
});

router.put('/:id', jsonParser, validation(musiciansSchema), (req, res) => {
  const [musician] = req.body;
  if (!musician || musician.id === parseInt(req.params.id, 10)) {
    return res.status(400).json({
      errorMessage: 'Request path id and request body id values must match',
    });
  }

  Musicians.update({
    id: req.params.id,
    firstName: musician.firstName,
    lastName: musician.lastName,
    genre: musician.genre,
    songs: musician.songs,
  });

  res.status(200).json({
    id: `${req.params.id}`,
  });
});

module.exports = { router };
