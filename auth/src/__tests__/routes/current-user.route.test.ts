import { getCurrentUser } from '../../services/current-user.service';
import request from 'supertest';
import { app } from '../../app';
import { user } from '../__mocks__/users.mock';

jest.mock('../../services/current-user.service');

const getCurrentUserMock = getCurrentUser as jest.Mock;

describe('current-user route', () => {
  it('should return 201 with a current user', async () => {
    getCurrentUserMock.mockImplementation(() =>
      Promise.resolve(user.toResponseObject())
    );

    const response = await request(app)
      .get('/api/users/current-user')
      .expect(201);

    expect(response.body.currentUser).toEqual(user.toResponseObject());
  });

  it('should return 201 with an empty object', async () => {
    getCurrentUserMock.mockImplementation(() => Promise.resolve(null));

    const response = await request(app)
      .get('/api/users/current-user')
      .expect(201);

    expect(response.body.currentUser).toBeNull();
  });
});
