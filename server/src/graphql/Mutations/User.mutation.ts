import { stringArg, objectType, nonNull, intArg, list } from "nexus";
import { hashPassword } from "../../utils/password.util";
import prisma from "../../utils/prisma.util";
import { Context } from "../../utils/types";


const UserMutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        role: stringArg(),
      },
      resolve: async (_, { username, email, password, role }, { db }: Context) => {
        const user = await db.user.create({
          data: {
            username,
            email,
            password: await hashPassword(password),
            role
          }
        });
        return user;
      },
    });
    t.field("deleteUser", {
      type: "User",
      args: {
        id: nonNull(intArg())
      },
      resolve: async (_, { id }) => {
        return await prisma.user.delete({
          where: {
            id
          }
        });
      }
    });
  },
});

export default UserMutation;
