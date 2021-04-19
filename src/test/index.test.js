const request = require('supertest');
const app = require('../index');

describe('test the root path', 'GET', () => {
  it('should response the GET method', () => {
    return request(app)
      .get('/')
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});
