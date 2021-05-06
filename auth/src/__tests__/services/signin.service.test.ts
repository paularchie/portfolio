/* eslint-disable @typescript-eslint/no-explicit-any */
import sinon from 'sinon';
import * as typeorm from 'typeorm';
import { BadRequestError } from '@supreme-tech/common';
import { signin } from '../../services/signin.service';
import * as bcrypt from 'bcrypt';
import { password, user, userCredentials } from '../__mocks__/users.mock';

const sandbox = sinon.createSandbox();

describe('signin service', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('should throw bad request error if a user with a given email does not exist', async () => {
    sandbox.stub(typeorm, 'getRepository').returns({
      findOne: () => Promise.resolve()
    } as any);

    try {
      await signin(userCredentials);
      throw new Error('unexpected success');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestError);
      expect(err.statusCode).toEqual(400);
      expect(err.message).toEqual('Invalid credentials');
    }
  });

  it('should throw bad request error if passwords do not match', async () => {
    user.password = await bcrypt.hash(password, 10);
    sandbox
      .stub(typeorm, 'getRepository')
      .returns({ findOne: () => Promise.resolve(user) } as any);

    try {
      await signin({ ...userCredentials, password: 'incorrect password' });
      throw new Error('unexpected success');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestError);
      expect(err.statusCode).toEqual(400);
      expect(err.message).toEqual('Invalid Credentials');
    }
  });

  it('should return a user if provided credentials are correct', async () => {
    user.password = await bcrypt.hash(password, 10);
    sandbox
      .stub(typeorm, 'getRepository')
      .returns({ findOne: () => Promise.resolve(user) } as any);

    const authenticatedUser = await signin(userCredentials);

    expect(authenticatedUser).toEqual(user.toResponseObject());
  });
});
