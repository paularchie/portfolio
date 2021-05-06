/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserCredentials } from '@supreme-tech/common';
import { UserEntity } from '../../enties/User.entity';

export const id = 'id';
export const email = 'test@test.com';
export const password = 'password';

export const userCredentials: UserCredentials = {
  email,
  password
};

export const user = new UserEntity();
user.id = id as any;
user.email = email;
