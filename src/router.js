'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Musicians } = require('./models');

import musiciansSchema from './schema-validation/schema-validation';

import validation from './schema-validation/validation-middleware';

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
  console.log('params', req.params.id);
  console.log('body', req.body, req.body[0].id);

  const ids = req.body.map(item => item.id);
  const id = ids.toString();
  console.log('id', id);

  const songsArray = req.body.map(song => {
    console.log('songs song', song);
    return song.songs;
  });
  console.log('songsArray', songsArray[0]);

  if (!(req.params.id && id && req.params.id === id)) {
    return res.status(400).json({
      errorMessage: 'Request path id and request body id values must match',
    });
  }

  req.body.map(musician => {
    const updatedFields = Musicians.update({
      id: req.params.id,
      firstName: musician.firstName,
      lastName: musician.lastName,
      genre: musician.genre,
      songs: songsArray[0],
    });
  });

  res.status(200).json({
    id: `${req.params.id}`,
  });
});

module.exports = { router };
