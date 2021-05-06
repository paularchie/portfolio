import { BadRequestError, User, UserCredentials } from '@supreme-tech/common';
import { getRepository } from 'typeorm';
import { UserEntity } from '../enties/User.entity';

export const signup = async ({
  email,
  password
}: UserCredentials): Promise<User> => {
  if (await getRepository(UserEntity).findOne({ email })) {
    throw new BadRequestError('Email in use');
  }

  const user = new UserEntity();
  user.email = email;
  user.password = password;

  const newUser = await getRepository(UserEntity).save(user);

  return newUser.toResponseObject();
};
