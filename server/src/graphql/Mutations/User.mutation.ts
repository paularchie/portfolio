import { User } from "@prisma/client";
import { stringArg, objectType, nonNull, intArg } from "nexus";
import { hashPassword } from "../../utils/password.util";


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
      resolve: async (_, { username, email, password, role }: any, { db }): Promise<User> => {
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
      resolve: async (_, { id }, { db }): Promise<User> => {
        return await db.user.delete({
          where: {
            id
          }
        });
      }
    });
  },
});

export default UserMutation;
