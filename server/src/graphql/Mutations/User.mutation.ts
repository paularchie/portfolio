import { validationErrorResponse, userResponse, isEmail, validatePassword } from '@portfolio/common/build/utils';
import { UserSignUpInput, UserDeleteInput, ValidationError } from '@portfolio/common/build/types';
import { GraphQLErrors } from '@portfolio/common/build/constants';
import { ForbiddenError } from 'apollo-server-express';
import { objectType, arg, nonNull } from 'nexus';
import { isAdmin } from '../../utils/auth.util';
import { hashPassword } from '../../utils/password.util';
import { PrismaClient } from '.prisma/client';

const UserMutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signUp', {
      type: 'SignUpResult',
      args: {
        data: nonNull(arg({ type: 'UserSignUpInput' }))
      },
      resolve: async (_, { data }: { data: UserSignUpInput }, { currentUser, prisma }) => {
        if (!isAdmin(currentUser) && data.role === 'ADMIN') {
          throw new ForbiddenError(GraphQLErrors.FORBIDDEN.message);
        }

        const errors = await validateSignUpInput(data, prisma);

        if (errors.length) {
          return validationErrorResponse(errors);
        }

        const newUser = await prisma.user.create({
          data: {
            ...data,
            password: await hashPassword(data.password)
          }
        });

        return userResponse(newUser);
      }
    });

    t.field('deleteUser', {
      type: 'User',
      args: {
        data: nonNull(arg({ type: 'UserDeleteInput' }))
      },
      resolve: async (_, { data }: { data: UserDeleteInput }, { currentUser, prisma }) => {
        if (currentUser.id !== data.id && !isAdmin(currentUser)) {
          throw new ForbiddenError(GraphQLErrors.FORBIDDEN.message);
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

async function validateSignUpInput(data: UserSignUpInput, prisma: PrismaClient): Promise<ValidationError[]> {
  const errors: ValidationError[] = [];

  if (!isEmail(data.email)) {
    errors.push({
      message: 'Invalid email address',
      field: 'email'
    });
  }

  const passwordErrors = validatePassword(data.password);
  if (passwordErrors.length) {
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
