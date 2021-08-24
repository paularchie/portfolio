import { Role, User } from '@prisma/client';
import { USER_FIELDS } from '../src/utils/constants';
import { hashPassword } from '../src/utils/password.util';
import { UserFactory } from './factories/user.factory';
import { signUpMutation, deleteUserMutation } from '@portfolio/common/build/graphql/mutations';
import { getUserQuery, loginQuery, logoutQuery, usersQuery } from '@portfolio/common/build/graphql/queries';
import { GraphQLErrors } from '@portfolio/common/build/constants';
import { returnsError } from './test-utils';
import { createTestContext } from './__helpers';
import * as _ from 'lodash';

const ctx = createTestContext();

//TODO: test validation

describe('createUser mutation', () => {
  describe('not being logged in as Admin', () => {
    test('returns an error when trying to assign the Admin rights to a user', async () => {
      await returnsError(async () => {
        const user = await UserFactory.build({ role: Role.ADMIN });
        const variables = { data: user };

        await ctx.request(signUpMutation, variables);
      }, GraphQLErrors.FORBIDDEN);
    });

    test('creates a user with a default User role added', async () => {
      const user = await UserFactory.build({ password: 'Mssjj23k4l30' });
      const variables = { data: user };

      const res = await ctx.request(signUpMutation, variables);

      const createdUser = await findUser(user.email);

      expect(createdUser).toMatchObject(extractUserPublicFields(user));
      expect(res.signUp).toEqual(createdUser);
      expect(res.signUp.role).toBe(Role.USER);
    });
  });

  describe('being logged in as Admin', () => {
    test('creates a user with a role passed in the request', async () => {
      const user = await UserFactory.build({ role: Role.ADMIN });
      const variables = { data: user };

      const res = await ctx.requestAsAdmin(signUpMutation, variables);

      expect(res.signUp).toMatchObject({ role: user.role });
    });
  });
});

describe('deleteUser mutation', () => {
  describe('being logged in as Admin', () => {
    test('deletes a user', async () => {
      await checkDeleteUser('id');
      await checkDeleteUser('email');

      async function checkDeleteUser(fieldName: string) {
        const user = await UserFactory.create();
        const variables = {
          data: {
            [fieldName]: user[fieldName]
          }
        };

        expect(await findUser(user.email)).not.toBe(null);

        const res = await ctx.requestAsAdmin(deleteUserMutation, variables);

        expect(await findUser(user.email)).toBe(null);
        expect(res.deleteUser).toMatchObject({ id: user.id });
      }
    });
  });

  describe('being logged in as User', () => {
    test('returns an error trying to delete a different user', async () => {
      await returnsError(async () => {
        const loggedInUser = await UserFactory.create();
        const otherUser = await UserFactory.create();
        const variables = { data: { id: otherUser.id } };

        await ctx.requestAsUser(loggedInUser, deleteUserMutation, variables);
      }, GraphQLErrors.FORBIDDEN);
    });

    test('deletes a user', async () => {
      const loggedInUser = await UserFactory.create();
      const variables = { data: { id: loggedInUser.id } };

      const res = await ctx.requestAsUser(loggedInUser, deleteUserMutation, variables);

      expect(res.deleteUser).toMatchObject({ email: loggedInUser.email });
    });
  });
});

describe('login query', () => {
  test('logs in a user', async () => {
    const password = 'password123';
    const user = await UserFactory.create({
      password: await hashPassword(password)
    });
    const variables = {
      data: {
        email: user.email,
        password
      }
    };

    const res = await ctx.request(loginQuery, variables);
    const actualUser = await findUser(user.email);

    expect(res.login).toEqual(actualUser);
  });

  test('returns an Authentication error', async () => {
      const variables = {
        data: {
          email: 'adam@test.com',
          password: 'password123'
        }
      };
      const res = await ctx.request(loginQuery, variables);
      console.log({res})
  });
});

describe('logout query', () => {
  test('returns a user id when successfully logged out', async () => {
    const user = await UserFactory.build({ id: 'user-id' });

    const res = await ctx.requestAsUser(user, logoutQuery);

    expect(res.logout).toEqual(user.id);
  });

  test('returns null if there\'s no user to log out', async () => {
    const res = await ctx.request(logoutQuery);

    expect(res.logout).toEqual(null);
  });
});

describe('getUser query', () => {
  test("returns logged in user's data", async () => {
    const user = await UserFactory.create();

    const res = await ctx.requestAsUser(user, getUserQuery);
    const actualUser = await findUser(user.email);

    expect(res.getUser).toEqual(actualUser);
  });

  test("returns null if logged in user doesn't exist", async () => {
    const user = await UserFactory.build({ id: 'user-id' });

    const res = await ctx.requestAsUser(user, getUserQuery);

    expect(res.getUser).toBe(null);
  });
});

describe('users query', () => {
  test('returns an error if called by a non-admin user', async () => {
    await returnsError(async () => {
      const user = await UserFactory.build();
      await ctx.requestAsUser(user, usersQuery);
    }, GraphQLErrors.FORBIDDEN);
  });

  test('returns all users', async () => {
    await UserFactory.createMany(20);
    const allUsers = await findAllUsers();

    const res = await ctx.requestAsAdmin(usersQuery);

    expect(res.users.length).toEqual(allUsers.length);

    res.users.forEach((user, index) => {
      expect(user).toEqual(allUsers[index]);
    });
  });
});

async function findUser(email: string): Promise<User> {
  return (await ctx.prisma.user.findUnique({
    where: {
      email
    },
    select: {
      ...userFieldSelect()
    }
  })) as User;
}

async function findAllUsers(): Promise<User[]> {
  return (await ctx.prisma.user.findMany({
    select: {
      ...userFieldSelect()
    }
  })) as User[];
}

function userFieldSelect(): { [key: string]: true } {
  return USER_FIELDS.reduce((acc, field: string) => {
    return {
      ...acc,
      [field]: true
    };
  }, {});
}

function extractUserPublicFields(user: User): User {
  return _.pick(user, USER_FIELDS);
}
