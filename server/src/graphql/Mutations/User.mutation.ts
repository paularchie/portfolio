import { UserSignUpInput, UserDeleteInput, PrismaClient, GraphQLErrors, ValidationError } from '@portfolio/common';
import { ForbiddenError } from 'apollo-server-express';
import { objectType, arg, nonNull } from 'nexus';
import { isAdmin } from '../../utils/auth.util';
import { hashPassword } from '../../utils/password.util';
import { isEmail, validatePassword } from '../../utils/validation.utils';

const UserMutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signUp', {
      type: 'SignupResult',
      args: {
        data: nonNull(arg({ type: 'UserSignUpInput' }))
      },
      resolve: async (_, { data }: { data: UserSignUpInput }, { currentUser, prisma }) => {
        if (!isAdmin(currentUser) && data.role === 'ADMIN') {
          throw new ForbiddenError(GraphQLErrors.FORBIDDEN.message);
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
