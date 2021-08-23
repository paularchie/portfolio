import { objectType, nonNull, arg } from 'nexus';
import { comparePasswords } from '../../utils/password.util';
import { createSessionToken } from '../../utils/auth.util';
import { UserLoginInput } from '@portfolio/common/build/types';
import { authErrorResponse, userResponse } from '@portfolio/common/build/utils';

const UserQuery = objectType({
  name: 'Query',
  definition(t) {
    t.field('login', {
      type: 'LoginResult',
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
            return userResponse(user);
          }
          return authErrorResponse();
        }
        return authErrorResponse();
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
