import { AuthenticationError } from 'apollo-server-express';
import { objectType, nonNull, arg } from 'nexus';
import { comparePasswords } from '../../utils/password.util';
import { createSessionToken } from '../../utils/auth.util';
import { GraphQLErrors, UserLoginInput } from '@portfolio/common';

const UserQuery = objectType({
  name: 'Query',
  definition(t) {
    t.field('login', {
      type: 'User',
      args: {
        data: nonNull(arg({ type: 'UserLoginInput' }))
      },
      resolve: async (_, { data: { email, password } }: { data: UserLoginInput }, { prisma, res }) => {
        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (user) {
          if (await comparePasswords(user.password, password)) {
            const token = await createSessionToken(user);
            res.cookie('SESSION', token, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24 * 365
            });
            return user;
          }
          throw new AuthenticationError(GraphQLErrors.AUTHENTICATION.message);
        }
        throw new AuthenticationError(GraphQLErrors.AUTHENTICATION.message);
      }
    });

    t.field('logout', {
      type: 'String',
      resolve: (_, __, { res, currentUser }) => {
        res.clearCookie('SESSION');
        return currentUser?.id;
      }
    });

    t.field('getUser', {
      type: 'User',
      resolve: (_, __, { prisma, currentUser }) => {
        if (currentUser) {
          return prisma.user.findUnique({
            where: {
              id: currentUser.id
            }
          });
        }
        return null;
      }
    });

    t.list.field('users', {
      type: 'User',
      resolve: async (_, __, { prisma }) => {
        return await prisma.user.findMany();
      }
    });
  }
});

export default UserQuery;
