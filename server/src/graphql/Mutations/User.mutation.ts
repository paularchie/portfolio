import { Role } from "@prisma/client";
import { ForbiddenError } from "apollo-server-express";
import { objectType, arg, nonNull } from "nexus";
import { isAdmin } from "../../utils/auth.util";
import { GraphQLError } from "../../utils/constants";
import { hashPassword } from "../../utils/password.util";


const UserMutation = objectType({
  name: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      args: {
        data: nonNull(arg({ type: 'UserCreateInput' }))
      },
      resolve: async (_, { data }, { currentUser, prisma }) => {
        if (!isAdmin(currentUser) && data.role === Role.ADMIN) {
          throw new ForbiddenError(GraphQLError.FORBIDDEN.message);
        }
        const user = await prisma.user.create({
          data: {
            ...data,
            password: await hashPassword(data.password),
          }
        });
        return user;
      },
    });

    t.field("deleteUser", {
      type: "User",
      args: {
        data: nonNull(arg({ type: 'UserDeleteInput' }))
      },
      resolve: async (_, { data }, { currentUser, prisma }) => {
        if (currentUser.id !== data.id && !isAdmin(currentUser)) {
          throw new ForbiddenError(GraphQLError.FORBIDDEN.message)
        }
        return await prisma.user.delete({
          where: {
            ...data
          }
        });
      }
    });
  },
});

export default UserMutation;
