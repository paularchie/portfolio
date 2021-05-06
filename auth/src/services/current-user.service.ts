import { User } from '@supreme-tech/common';
import { getRepository } from 'typeorm';
import { UserEntity } from '../enties/User.entity';

export const getCurrentUser = async (currentUser?: User): Promise<User> => {
  let user: UserEntity;

  if (currentUser) {
    user = await getRepository(UserEntity).findOne({
      email: currentUser.email
    });
  }

  return user ? user.toResponseObject() : null;
};
