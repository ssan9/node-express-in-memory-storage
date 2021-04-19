const { musicians } = require('./musicians');

const { getSongs } = require('./songs');

function StorageException(message) {
  this.message = message;
  this.name = 'StorageException';
}

function combineData(
  obj,
  keyName = 'id',
  firstName = 'firstName',
  lastName = 'lastName',
  genre = 'genre',
  songs = 'songs'
) {
  return Promise.all(
    Object.keys(obj)
      .filter(key => Object.hasOwnProperty.call(obj, key))
      .map(async key => {
        const res = await getSongs(key).catch(() => []);
        const keyValue = {};
        keyValue[keyName] = key;
        keyValue[firstName] = obj[key].firstName;
        keyValue[lastName] = obj[key].lastName;
        keyValue[genre] = obj[key].genre;
        keyValue[songs] = res;
        return keyValue;
      })
  );
}

const Musicians = {
  create: (id, firstName, lastName, genre) => {
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
  get: () => {
    // combining musicians and songs data on combineData function call and return the data as array of objects when the get method is called
    return combineData(musicians);
  },
  getById: async musicianId => {
    const { id } = musicianId;
    // returning the id, musicians and songs data when the getById function is called if the path id exists in the musicians data
    const songs = await getSongs(id).catch(() => []);
    if (musicians[id]) {
      return {
        id,
        ...musicians[id],
        songs,
      };
    }
    return null;
  },
  update: updatedItem => {
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
