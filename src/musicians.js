// A collection of musicians where the key is the unique id

/* eslint-disable import/prefer-default-export */
export const musicians = {
  // when the server first starts, we manually add four items to the musicians, so there will be something to retrieve.
  ella: {
    firstName: 'Ella',
    lastName: 'Fitzgerald',
    genre: 'JAZZ',
  },

  sinatra: {
    firstName: 'Frank',
    lastName: 'Sinatra',
    genre: 'JAZZ',
  },

  mccartney: {
    firstName: 'Paul',
    lastName: 'McCartney',
    genre: 'ROCK',
  },

  waters: {
    firstName: 'Muddy',
    lastName: 'Waters',
    genre: 'BLUES',
  },
};
