const { musicians } = require('./musicians');

const { getSongs } = require('./songs');

function StorageException(message) {
  // normally es6 classes are not used for throwing error but if you do use these,
  this.message = message; // then add throw 'new' and call the function
  this.name = 'StorageException';
}

function combineData( // combining data from musicians and songs file and displaying in a different structure
  obj,
  keyName = 'id',
  firstName = 'firstName',
  lastName = 'lastName',
  genre = 'genre',
  songs = 'songs'
) {
  return Promise.all(
    // songs file is exporting a function which is using async. With async you should always use
    Object.keys(obj) // either async/await or promises.Promise all here means we are combining the array data and
      .filter(key => Object.hasOwnProperty.call(obj, key)) // displaying it asynchronously using promises. To call the
      .map(async key => {
        // async function we need to use await. And if we use await in the
        const res = await getSongs(key).catch(() => []); // current function we need to use async in the beginning of the
        const keyValue = {}; // block.
        keyValue[keyName] = key; // Async/await is a cleaner form of using promises
        keyValue[firstName] = obj[key].firstName; // Catch block holds empty array to take care of error handling
        keyValue[lastName] = obj[key].lastName; // it means if no song is present for the musicians object then
        keyValue[genre] = obj[key].genre; // return an empty array
        keyValue[songs] = res;
        return keyValue;
      })
  );
}

// alternate function using traditional promises alone (without async/await)

// function objectToKeyValueArray(obj, keyName = 'id', firstName = 'firstName', lastName = 'lastName', genre = 'genre', songs = 'songs') {
// return Promise.all(Object.keys(obj)
//     .filter(key => Object.hasOwnProperty.call(obj, key))
//     .map(key =>
//         getSongs(key).then(res => {   // so here instead of async/await we use promises
//           console.log('result', res)
//           const keyValue = {};
//           keyValue[keyName] = key;
//           keyValue[firstName] = obj[key].firstName;
//           keyValue[lastName] = obj[key].lastName;
//           keyValue[genre] = obj[key].genre;
//           keyValue[songs] = res;
//           return keyValue;
//         })))
// }

// alternative method by using 'of' method

// function objCombine(obj, variable) {
//   for (let key of Object.keys(obj)) {
//     if (!variable[key]) variable[key] = {};

//     for (let innerKey of Object.keys(obj[key]))
//       variable[key][innerKey] = obj[key][innerKey];
//   }
// }

// let combined = {};
// objCombine(musicians, combined);
// const songs = await getSongs().catch(() => []);
// objCombine(songs, combined);
// console.log(combined)
// return combined;

/*  eslint func-names: ["error", "as-needed"] */
const Musicians = {
  // we create a model called Musicians here
  /* eslint object-shorthand: ["error", "always", { "ignoreConstructors": true }] */
  create: (id, firstName, lastName, genre) => {
    // to use object shorthand - check the repo's - v/final branch; // To add a new item to the Musicians model, just call create with the appropriate arguments. The create method takes 4 parameters, id, firstName, lastName, genre. It then returns an object representing the item.
    const musician = {
      id,
      firstName,
      lastName,
      genre,
    };
    // merging the passed data with the new id and return the new data when the function is called
    musicians[musician.id] = musician;
    return musician;
  },
  get: async () => {
    // You should get back a JSON response that contains an array of musicians. Each musicians item has the following properties: id, firstname, lastname, genre and songs. We have a single musicians resource that our server exposes at /musicians.
    // combining musicians and songs data on combineData function call and return the data as array of objects when the get method is called
    return combineData(musicians); // The get() method is used to retrieve all items that are currently stored in the Musicians.
  },
  getById: async musicianId => {
    const { id } = musicianId;
    // returning the id, musicians and songs data when the getById function is called if the path id exists in the musicians data
    const songs = await getSongs(id).catch(() => []);
    if (musicians[id]) {
      // here we are checking if params id exists in musicians then merge id, musicians data
      return {
        // based on the id and songs, otherwise return null
        id,
        ...musicians[id],
        songs,
      };
    }
    return null;
  },
  // delete: musicianId => {    // The delete() method takes a single argument: the id of the musicians item to be deleted. Note that if you pass this method an id for an item that does not exist, no error will be thrown.
  //   console.log(`Deleting recipe with id \`${musicianId}\``);
  //   delete musicians[musicianId];
  // },
  update: updatedItem => {
    // Finally, the update() method takes a single parameter: updatedItem which is an object representing the updated item. Note that this method will throw an error if it tries to update a non-existent item.
    const { id } = updatedItem;
    if (!(id in musicians)) {
      throw new StorageException(
        `Can't update item \`${id}\` because it doesn't exist.`
      );
    }
    // merging the passed data with the existing id and return the updated data when the function is called
    musicians[updatedItem.id] = updatedItem;
    return updatedItem;
  },
};

function createMusicians() {
  const storage = Object.create(Musicians);
  storage.musicians = {};
  return storage;
}

module.exports = {
  Musicians: createMusicians(),
};
