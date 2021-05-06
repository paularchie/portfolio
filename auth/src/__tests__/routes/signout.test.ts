import { requireAuth } from '@supreme-tech/common';
import request from 'supertest';
import { app } from '../../app';

jest.mock('@supreme-tech/common');

const requireAuthStub = (req, res, next) => {
  next();
};

(requireAuth as jest.Mock).mockImplementation(requireAuthStub);

describe('signout route', () => {
  it('clears the cookie after signing out', async () => {
    const response = await request(app)
      .post('/api/users/signout')
      .send({})
      .expect(200);

    expect(response.get('Set-Cookie')[0]).toEqual(
      'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    );
  });
});
