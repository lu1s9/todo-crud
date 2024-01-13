import request from 'supertest';
import app from '../src/app.js';
import { connectDB, disconnectDB } from '../src/db.js';
import User from '../src/models/user.model.js';

describe('POST /api/signup', () => {
  beforeAll(async () => {
    connectDB();
  });

  afterAll(async () => {
    await User.deleteMany({ email: 'luis2@luis.com' });
    disconnectDB();
  });

  const newUser = {
    username: 'luis',
    email: 'luis2@luis.com',
    password: 'luis123',
  };

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

  it('should respond with a 201 status code with correct value returning an id', async () => {
    const response = await request(app).post('/api/signup').send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.headers['content-type']).toContain('json');
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.username).toBe(newUser.username);
    expect(response.body.data.email).toBe(newUser.email);
  });

  it('should respond with a 409 status code with duplicate record of email field', async () => {
    const response = await request(app).post('/api/signup').send(newUser);
    expect(response.statusCode).toBe(409);
    // My own error thrown with message property
    expect(response.body.message).toBeDefined();
    expect(response.headers['content-type']).toContain('json');
  });

  invalidScenarios.forEach(({ data, description }) => {
    it(`should respond with a 400 status code when ${description}`, async () => {
      const response = await request(app).post('/api/signup').send(data);
      expect(response.statusCode).toBe(400);
      // Zod sends an error property
      expect(response.body.error).toBeDefined();
      expect(response.headers['content-type']).toContain('json');
    });
  });
});
