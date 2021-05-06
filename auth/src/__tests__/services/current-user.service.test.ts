/* eslint-disable @typescript-eslint/no-explicit-any */
import sinon from 'sinon';
import * as typeorm from 'typeorm';
import { getCurrentUser } from '../../services/current-user.service';
import { user } from '../__mocks__/users.mock';

const sandbox = sinon.createSandbox();

describe('getCurrentUser service', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('should return a user if the current user has been found in the repository', async () => {
    sandbox
      .stub(typeorm, 'getRepository')
      .returns({ findOne: () => Promise.resolve(user) } as any);

    const foundUser = await getCurrentUser(user.toResponseObject());

    expect(foundUser).toEqual(user.toResponseObject());
  });

  it('should NOT return a user if the current user has not been found in the repository', async () => {
    sandbox
      .stub(typeorm, 'getRepository')
      .returns({ findOne: () => Promise.resolve() } as any);

    const foundUser = await getCurrentUser(user.toResponseObject());

    expect(foundUser).toBeNull();
  });

  it('should NOT return a user if the current user has not been provided', async () => {
    sandbox
      .stub(typeorm, 'getRepository')
      .returns({ findOne: Promise.resolve() } as any);

    const foundUser = await getCurrentUser();

    expect(foundUser).toBeNull();
  });
});
