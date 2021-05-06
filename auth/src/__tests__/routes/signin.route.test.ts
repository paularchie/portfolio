import request from 'supertest';
import { app } from '../../app';
import { signin } from '../../services/signin.service';
import { user, email, password } from '../__mocks__/users.mock';

jest.mock('../../services/signin.service');

const signinMock = signin as jest.Mock;

describe('signin route', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns a 400 with an invalid email', async () => {
    await request(app)
      .post('/api/users/signin')
      .send({ email: 'alskdflaskjfd' })
      .expect(400);
  });

  it('should return 200 if a user has been successfully authenticated', async () => {
    signinMock.mockImplementation(() =>
      Promise.resolve(user.toResponseObject())
    );

    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email,
        password
      })
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
