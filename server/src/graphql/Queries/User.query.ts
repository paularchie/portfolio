import { AuthenticationError } from "apollo-server-express";
import { objectType, stringArg, nonNull } from "nexus";
import prisma from "../../utils/prisma.util";
import { comparePasswords } from "../../utils/password.util";
import { createSessionToken } from "../../utils/auth.util";
import { User } from "@prisma/client";

const UserQuery = objectType({
  name: "Query",
  definition(t) {
    t.field("login", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { email, password }, { res }): Promise<User> => {
        const user = await prisma.user.findUnique({
          where: { email }
        });
        if (user) {
          if (await comparePasswords(user.password, password)) {
            const token = await createSessionToken(user);
            res.cookie("SESSION", token, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24 * 365,
            });
            return user;
          }
          throw new AuthenticationError("Incorrect credentials");
        }
        throw new AuthenticationError("Incorrect credentials");
      },
    });
    t.field("getUser", {
      type: "User",
      resolve: (_, __, { currentUser }): Promise<User> => {
        if (currentUser) {
          return prisma.user.findUnique({ where: { id: currentUser.id } });
        }
        return null;
      },
    });
    t.list.field("users", {
      type: "User",
      resolve: async (): Promise<User[]> => {
        return await prisma.user.findMany();
      },
    });
  },
});

export default UserQuery;
