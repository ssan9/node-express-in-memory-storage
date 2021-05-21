const express = require('express');

// creating a new Express router instance to modularize different router end points
const router = express.Router();

// using body-parser's JSON-parser to parse the JSON data sent by clients
const bodyParser = require('body-parser');
var recipes = require('../recipes.json');

const jsonParser = bodyParser.json();

const { Recipes } = require('./models');
const {
  musiciansSchema,
  musiciansUpdateSchema,
} = require('./schema-validation/schema-validation');
const { validation } = require('./schema-validation/validation-middleware');

// getting all musicians
// router.get('/', async (req, res) => {
//   const musicians = await Musicians.get();
//   res.json(musicians);
// });

// router.get('/', (req, res) => {
//   console.log('ji');
//   res.status(200).json(Recipes.get());
// });

router.get('/shopping-list', (req, res) => {
  // console.log('req', req.query);
  // console.log('recipes', recipes, 'recipes.id', recipes.id);
  // console.log('req.query', req.query, 'req.query.id', req.query.id);
  // const [recipe] = recipes;
  // console.log('recipeeeee', recipe)
  // if (recipe.id) {
  // console.log('recipeiddd', recipe.id);
  // const recipeId = recipes.map(recipe => recipe.id)
  // const recipeId = recipes.filter(recipe => recipe.id === req.query.ids ? recipe.id : null)
  const arr = [];
  const recipeId = recipes.forEach(recipe => {
    console.log('1111', typeof recipe.id, 'jhjgjgjgjgj', typeof req.query.ids);
    if (recipe.id == req.query.ids) {
      console.log('iiijjhhjhjgj');
      arr.push(recipe.id);
    }
  });

  console.log('hjgghhfhf', typeof arr[0]);

  // const [...recipeId] = recipes;
  console.log('recipeId', recipeId, 'req.query.ids', req.query.ids, 'arr', arr);
  console.log('hhhhhhhhhhhhhhh');
  let m = arr[0];
  if (m == req.query.ids) {
    console.log('m', m, req.query.ids);
    if (req.query.ids) {
      console.log('recipes', recipes, 'yooo', recipes.id);
      return res.json(Recipes.getById(req.query));
    } else {
      res.status(400).end();
    }
  } else {
    res.status(404).json({
      errorMessage: 'NOT_FOUND',
    });
  }
});

// getting musicians by id
// router.get('/:id', async (req, res) => {
//   try {
//     const musicians = await Musicians.getById(req.params);
//     if (musicians.id) res.json(musicians);
//   } catch (err) {
//     res.status(400).json({
//       errorMessage: 'Musician does not exist',
//     });
//   }
// });

// passing through bodyParser middleware and validation middleware before creating/adding musician data
// router.put('/', jsonParser, validation(musiciansSchema), (req, res) => {
//   const newMusician = Musicians.create(
//     req.body.id,
//     req.body.firstName,
//     req.body.lastName,
//     req.body.genre
//   );
//   res.status(201).json(newMusician);
// });

// updating musician data by id
// router.put(
//   '/:id',
//   jsonParser,
//   validation(musiciansUpdateSchema),
//   async (req, res) => {
//     try {
//       // calling the update function to update the old values with the new values if the values of path id and request body id match
//       Musicians.update({
//         id: req.params.id,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         genre: req.body.genre,
//         songs: req.body.songs,
//       });

//       return res.status(200).json({
//         id: `${req.params.id}`,
//       });
//     } catch (err) {
//       return res.status(400).json({
//         errorMessage: err,
//       });
//     }
//   }
// );

module.exports = { router };
