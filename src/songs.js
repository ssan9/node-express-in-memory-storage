// NOTE: DO NOT MODIFY THIS FILE

// Note: songs is only being exported for testing reasons. Do not use this variable for any other
// reasons except for testing.
export const songs = {
  ella: [
    {
      name: "It Don't Mean a Thing",
    },
    {
      name: 'Dream a Little Dream of Me',
    },
  ],

  sinatra: [
    {
      name: 'Come Fly with Me',
    },
    {
      name: 'Fly Me to the Moon',
    },
  ],
};

// Note: this function is async as it simulates the async nature of many real-world back ends
export const getSongs = async musicianId => {
  if (songs[musicianId] === undefined) {
    throw new Error('no songs for musician');
  } else {
    return songs[musicianId];
  }
};
