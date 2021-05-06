import request from 'supertest';
import { BadRequestError } from '@supreme-tech/common';
import { app } from '../../app';
import { user, email, password } from '../__mocks__/users.mock';
import { signup } from '../../services/signup.service';

jest.mock('../../services/signup.service');

const signupMock = signup as jest.Mock;

describe('signup route', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns a 400 with an invalid email', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({ email: 'alskdflaskjfd' })
      .expect(400);
  });

  it('should return 201 if a user has been successfully created', async () => {
    signupMock.mockImplementation(() =>
      Promise.resolve(user.toResponseObject())
    );

    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email,
        password
      })
      .expect(201);

    expect(response.body).toEqual(user.toResponseObject());
    expect(response.get('Set-Cookie')).toBeDefined();
  });

  it('should return 400 if a user already exists', async () => {
    signupMock.mockImplementation(() =>
      Promise.reject(new BadRequestError('error'))
    );

    return request(app)
      .post('/api/users/signup')
      .send({
        email,
        password
      })
      .expect(400);
  });
});
