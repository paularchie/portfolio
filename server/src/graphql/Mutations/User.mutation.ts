import { stringArg, objectType, nonNull, intArg, list } from "nexus";
import { UserRolesEnum } from "../../utils/constants";
import { hashPassword } from "../../utils/password.util";
import prisma from "../../utils/prisma.util";

const UserMutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        roles: list(stringArg()),
      },
      resolve: async (_, args, { db }) => {
        const user = await db.user.create({
          data: {
            ...args,
            password: await hashPassword(args.password),
            roles: {
              connect: {
                name: UserRolesEnum.User
              }
            }
          },
        });
        return user;
      },
    });

    t.field("deleteUser", {
      type: "User",
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (_, { id }) => {
        return await prisma.user.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});

export default UserMutation;
