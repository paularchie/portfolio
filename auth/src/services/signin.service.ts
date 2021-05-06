import { BadRequestError, User, UserCredentials } from '@supreme-tech/common';
import { getRepository } from 'typeorm';
import { UserEntity } from '../enties/User.entity';

export const signin = async ({
  email,
  password
}: UserCredentials): Promise<User> => {
  const existingUser = await getRepository(UserEntity).findOne({ email });

  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }

  const passwordsMatch = await existingUser.comparePassword(password);

  if (!passwordsMatch) {
    throw new BadRequestError('Invalid Credentials');
  }

  return existingUser.toResponseObject();
};
