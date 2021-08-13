import { Prisma, Role } from '@prisma/client';
import { ForbiddenError } from 'apollo-server-express';
import { objectType, arg, nonNull } from 'nexus';
import { isAdmin } from '../../utils/auth.util';
import { GraphQLError } from '../../utils/constants';
import { hashPassword } from '../../utils/password.util';
import { ValidationError } from '../../utils/types';
import { isEmail, validatePassword } from '../../utils/validation.utils';

import {User} from '@portfolio/common';

const UserMutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signUp', {
      type: 'SignupResult',
      args: {
        data: nonNull(arg({ type: 'UserSignUpInput' }))
      },
      resolve: async (_, { data }, { currentUser, prisma }) => {
        if (!isAdmin(currentUser) && data.role === Role.ADMIN) {
          throw new ForbiddenError(GraphQLError.FORBIDDEN.message);
        }

        const errors = await validateSignUpInput(data, prisma);

        if (errors.length) {
          return {
            __typename: 'ValidationErrors',
            errors
          };
        }

        const newUser = await prisma.user.create({
          data: {
            ...data,
            password: await hashPassword(data.password)
          }
        });

        return {
          __typename: 'User',
          ...newUser
        };
      }
    });

    t.field('deleteUser', {
      type: 'User',
      args: {
        data: nonNull(arg({ type: 'UserDeleteInput' }))
      },
      resolve: async (_, { data }, { currentUser, prisma }) => {
        if (currentUser.id !== data.id && !isAdmin(currentUser)) {
          throw new ForbiddenError(GraphQLError.FORBIDDEN.message);
        }
        return await prisma.user.delete({
          where: {
            ...data
          }
        });
      }
    });
  }
});


async function validateSignUpInput(data, prisma): Promise<ValidationError[]> {
  const errors: ValidationError[] = [];

  if (!isEmail(data.email)) {
    errors.push({
      message: 'Invalid email address',
      field: 'email'
    });
  }

  const passwordErrors = validatePassword(data.password);
  if (passwordErrors) {
    errors.push({
      message: 'Password too weak',
      field: 'password',
      errorTypes: passwordErrors
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (existingUser) {
    errors.push({
      message: 'Email already in use',
      field: 'email'
    });
  }

  return errors;
}

export default UserMutation;
