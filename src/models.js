const { musicians } = require('./musicians');
var recipes = require('../recipes.json');

const { getSongs } = require('./songs');

// function StorageException(message) {
//   this.message = message;
//   this.name = 'StorageException';
// }

// function combineData(
//   obj,
//   keyName = 'id',
//   firstName = 'firstName',
//   lastName = 'lastName',
//   genre = 'genre',
//   songs = 'songs'
// ) {
//   return Promise.all(
//     Object.keys(obj)
//       .filter(key => Object.hasOwnProperty.call(obj, key))
//       .map(async key => {
//         const res = await getSongs(key).catch(() => []);
//         const keyValue = {};
//         keyValue[keyName] = key;
//         keyValue[firstName] = obj[key].firstName;
//         keyValue[lastName] = obj[key].lastName;
//         keyValue[genre] = obj[key].genre;
//         keyValue[songs] = res;
//         return keyValue;
//       })
//   );
// }

/*  eslint func-names: ["error", "as-needed"] */
const Recipes = {
  //   /* eslint object-shorthand: ["error", "always", { "ignoreConstructors": true }] */
  //   create: (id, firstName, lastName, genre) => {
  //     const musician = {
  //       id,
  //       firstName,
  //       lastName,
  //       genre,
  //     };
  //     // merging the passed data with the new id and return the new data when the function is called
  //     musicians[musician.id] = musician;
  //     return musician;
  //   },
  // get: () => {
  //   // combining musicians and songs data on combineData function call and return the data as array of objects when the get method is called
  //   return combineData(musicians);
  // },
  //  get: function() {
  //   console.log('hi');
  //   return recipes.map(key => key);
  // },
  getById: recipeId => {
    let { ids } = recipeId;
    const recipeList = recipes.filter(recipe => recipe.id == ids);
    // if (recipe.id === ids) {
    // console.log('hiii', 'recipe.id', recipe.id, 'ids', ids);
    return recipeList[0].ingredients;
    // }
    // return null;
    // recipes[recipeId.id] = recipeId;
    // [id] = recipes;
    // console.log('recipe', recipes);
    // console.log('recipes', recipes[recipeId.id]);
    // return recipes[id];
  },
  // getById: async musicianId => {
  //   const { id } = musicianId;
  //   console.log('id', id, 'musicians[id]', musicians[id]);
  //   // returning the id, musicians and songs data when the getById function is called if the path id exists in the musicians data
  //   const songs = await getSongs(id).catch(() => []);
  //   if (musicians[id]) {
  //     return musicians[id];
  //   }
  //   return null;
  // },
  //  get: () => {
  //   // combining musicians and songs data on combineData function call and return the data as array of objects when the get method is called
  //   return combineData(musicians);
  // },
  //   getById: async musicianId => {
  //     const { id } = musicianId;
  //     // returning the id, musicians and songs data when the getById function is called if the path id exists in the musicians data
  //     const songs = await getSongs(id).catch(() => []);
  //     if (musicians[id]) {
  //       return {
  //         id,
  //         ...musicians[id],
  //         songs,
  //       };
  //     }
  //     return null;
  //   },
  //   update: updatedItem => {
  //     const { id } = updatedItem;
  //     if (!(id in musicians)) {
  //       throw new StorageException(
  //         `Can't update item \`${id}\` because it doesn't exist.`
  //       );
  //     }
  //     // merging the passed data with the existing id and return the updated data when the function is called
  //     musicians[updatedItem.id] = updatedItem;
  //     return updatedItem;
  //   },
};

function createMusicians() {
  const storage = Object.create(Recipes);
  storage.musicians = {};
  return storage;
}

module.exports = {
  Recipes: createMusicians(),
};
