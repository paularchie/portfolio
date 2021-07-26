import {
  AuthenticationError,
  ForbiddenError,
} from "apollo-server-errors";
import { ApolloError } from "apollo-server-express";
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
      if (ctx.currentUser.role !== UserRolesEnum.Admin) {
        return new ForbiddenError("Unauthorized");
      }
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
    deleteUser: rules.isAdmin,
  },
}, {
  fallbackError: async (error) => {
    if (error instanceof ApolloError) {
      // expected errors
      return error;
    } else if (error instanceof Error) {
      // unexpected errors
      return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
    } else {
      console.error('The resolver threw something that is not an error.')
      console.error(error);
      return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
    }
  },
});

