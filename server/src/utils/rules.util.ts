import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
} from "apollo-server-errors";
import { shield, rule } from "graphql-shield";
import { UserRolesEnum } from "./constants";
import { Context } from "./types";

export const rules = {
  isAuthenticated: rule({ cache: "contextual" })(
    (_parent, _args, ctx: Context) => {
      try {
        if (!ctx.currentUser) {
          return new AuthenticationError("Unauthenticated");
        }
        return true;
      } catch (err) {
        return err;
      }
    }
  ),
  isAdmin: rule({ cache: "contextual" })((_parent, _args, ctx: Context) => {
    try {
      if (!ctx.currentUser) {
        return new AuthenticationError("Unauthenticated");
      }
      console.log(ctx.currentUser)
      // if (!ctx.currentUser.roles.includes(UserRolesEnum.Admin)) {
      //   return new ForbiddenError("Unauthorized");
      // }
      return true;
    } catch (err) {
      return err;
    }
  }),
};

export const permissions = shield({
  Query: {
    users: rules.isAdmin,
  },
  Mutation: {
    createUser: rules.isAdmin,
  },
  // Subscription: {
  //   latestPost: rules.isAuthenticatedUser,
  // },
});
