import request from 'supertest';
import app from '../src/app.js';

describe('POST /api/signup', () => {
  const invalidScenarios = [
    { data: {}, description: 'empty or missing fields' },
    { data: { username: 'luis' }, description: 'missing email and password' },
    {
      data: { username: 'luis', email: 'luis@gmail.com' },
      description: 'missing password',
    },
    {
      data: { username: 'luis', email: 'luis@gmail.com', password: 'pass' },
      description: 'password less than 6 characters',
    },
    {
      data: { username: 'luis', email: 12345, password: 'pass123' },
      description: 'invalid email',
    },
    {
      data: { username: 'luis', email: 'josePedro.com', password: 'pass123' },
      description: 'invalid email format',
    },
    {
      data: { username: 1123, email: 'luis@gmail.com', password: 'pass123' },
      description: 'invalid data type for username',
    },
  ];

  invalidScenarios.forEach(({ data, description }) => {
    it(`should respond with a 400 status code when ${description}`, async () => {
      const response = await request(app).post('/api/signup').send(data);
      expect(response.statusCode).toBe(400);
    });
  });

  it.todo(
    'should respond with a status code with duplicate record of email field'
  );

  it.todo('should respond with a 201 status code when succesfully signin up');
});
