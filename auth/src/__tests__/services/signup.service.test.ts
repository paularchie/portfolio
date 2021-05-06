/* eslint-disable @typescript-eslint/no-explicit-any */
import sinon from 'sinon';
import * as typeorm from 'typeorm';
import { signup } from '../../services/signup.service';
import { BadRequestError } from '@supreme-tech/common';
import { user, userCredentials } from '../__mocks__/users.mock';

const sandbox = sinon.createSandbox();

describe('signup service', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('should return 400 if a user with the same email already exists', async () => {
    sandbox
      .stub(typeorm, 'getRepository')
      .returns({ findOne: () => Promise.resolve(user) } as any);

    try {
      await signup(userCredentials);
      throw new Error('unexpected success');
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestError);
      expect(err.statusCode).toEqual(400);
      expect(err.message).toEqual('Email in use');
    }
  });

  it('should return a new user if it has been successfully created', async () => {
    const findUserSpy = jest.fn(() => Promise.resolve(null));
    const saveUserSpy = jest.fn(() => Promise.resolve(user));

    const mockRepository: any = {
      findOne: findUserSpy,
      save: saveUserSpy
    };
    sandbox.stub(typeorm, 'getRepository').returns(mockRepository);

    const newUser = await signup(userCredentials);

    expect(findUserSpy).toHaveBeenCalled();
    expect(saveUserSpy).toHaveBeenCalled();
    expect(newUser).toEqual(user.toResponseObject());
  });
});
