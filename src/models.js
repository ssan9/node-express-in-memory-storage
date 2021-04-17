import musicians from './musicians';

const { getSongs } = require('./songs');

const uuid = require('uuid');

function StorageException(message) {
  console.log(hiii);
  this.message = message;
  this.name = 'StorageException';
}

function objectToKeyValueArrays(
  obj,
  keyName = 'id',
  firstName = 'firstName',
  lastName = 'lastName',
  genre = 'genre',
  songs = 'songs'
) {
  console.log('I am in the function');
  return Promise.all(
    Object.keys(obj)
      .filter(key => Object.hasOwnProperty.call(obj, key))
      .map(async key => {
        const res = await getSongs(key).catch(() => []);
        console.log('result', res);
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
  create: function(id, firstName, lastName, genre, songs) {
    console.log('Creating new musicians list');
    const musician = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      genre: genre,
    };
    musicians[musician.id] = musician;
    console.log('musician', musician);
    return [musician];
  },
  get: async function() {
    console.log('Retreiving musicians');
    return objectToKeyValueArrays(musicians);
  },
  getById: async function(musicianId) {
    const { id } = musicianId;
    if (musicians[id]) {
      const songs = await getSongs(id).catch(() => []);
      return {
        id,
        ...musicians[id],
        songs,
      };
    }
  },
  update: function(updatedItem) {
    console.log('updatedItemoooo', updatedItem);
    console.log(`Updating recipe with id \`${updatedItem.id}\``);
    const { id } = updatedItem;

    console.log('updatedId', id);
    if (!(id in musicians)) {
      console.log('hello');
      console.log('this.musicianObject', musicians);
      throw StorageException(
        `Can't update item \`${id}\` because doesn't exist.`
      );
    }
    console.log('musicians[updatedItem.id]', musicians[updatedItem.id]);
    musicians[updatedItem.id] = updatedItem;
    console.log('musicians[updatedItem.id12]', musicians[updatedItem.id]);

    console.log('updatedItem*************', updatedItem);
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
  functions: objectToKeyValueArrays,
};
