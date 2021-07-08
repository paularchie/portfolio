import { objectType, stringArg, nonNull } from "nexus";
import prisma from "../../utils/prisma.util";
import { comparePasswords } from "../../utils/password.util";
import { createSessionToken } from "../../utils/auth.util";
import { AuthenticationError } from "apollo-server-errors";

const UserQuery = objectType({
  name: "Query",
  definition(t) {
    t.field("login", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { email, password }, { res }) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email },
            // include: { roles: true },
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
            return new AuthenticationError("Incorrect credentials");
          }
          throw new AuthenticationError("Incorrect credentials");
        } catch (err) {
          return err;
        }
      },
    });
    t.field("getUser", {
      type: "User",
      resolve: (_, __, { currentUser }) => {
        if (currentUser) {
          return prisma.user.findUnique({ where: { id: currentUser.id } });
        }
        return null;
      },
    });
    t.list.field("users", {
      type: "User",
      resolve: async () => {
        return  await (
          await prisma.user.findMany({ include: { roles: true } })
        ).map((x) => {
          return { ...x, roles: x.roles.map((a) => a.name) };
        });
      },
    });
  },
});

export default UserQuery;
