const request = require('supertest');
const express = require('express');
const { router } = require('../router');
const { MUSICIANS_DATA } = require('../testData/test-data');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', router);

describe('GET', () => {
  it('should respond with an array of objects of Musicians with correct data types', done => {
    return request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .then(res => {
        expect(typeof res.body[0].id).toBe('string');
        expect(typeof res.body[0].firstName).toBe('string');
        expect(typeof res.body[0].lastName).toBe('string');
        expect(typeof res.body[0].genre).toBe('string');
        expect(typeof res.body[0].songs).toBe('object');
        expect(res.body).toMatchObject(MUSICIANS_DATA);
        expect(res.status).toEqual(200);
        done();
      });
  });

  it('should return Musicians data specific to id', () => {
    return request(app)
      .get('/ella')
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toStrictEqual({
          firstName: 'Ella',
          genre: 'JAZZ',
          id: 'ella',
          lastName: 'Fitzgerald',
          songs: [
            { name: "It Don't Mean a Thing" },
            { name: 'Dream a Little Dream of Me' },
          ],
        });
      });
  });
  it('should return error', () => {
    return request(app)
      .get('/abc')
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toStrictEqual({
          errorMessage: 'Musician does not exist',
        });
      });
  });
});

describe('PUT', () => {
  it('should create a new array of objects of Musicians', () => {
    request(app)
      .put('/')
      .send([
        {
          id: 'bella',
          firstName: 'Bella',
          lastName: 'Fitz',
          genre: 'ROCK',
        },
      ])
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual([
          { firstName: 'Bella', genre: 'ROCK', id: 'bella', lastName: 'Fitz' },
        ]);
      });
  });
  it('should error if creating a new object instead of array of objects of Musicians', () => {
    request(app)
      .put('/')
      .send({
        id: 'bella',
        firstName: 'Bella',
        lastName: 'Fitz',
        genre: 'ROCK',
      })
      .then(response => {
        expect(response.statusCode).toBe(400);
      });
  });
  it('should update a specific Musicians array of objects based on id', () => {
    request(app)
      .put('/ella')
      .send({
        id: 'ella',
        firstName: 'Fella',
        lastName: 'Fitz',
        genre: 'JAZZ',
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});
