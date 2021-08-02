import { Role } from "@prisma/client";
import {
  AuthenticationError,
  ForbiddenError,
} from "apollo-server-errors";
import { ApolloError } from "apollo-server-express";
import { shield, rule } from "graphql-shield";
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
      if (ctx.currentUser?.role !== Role.ADMIN) {
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
  Mutation: {},
}, {
  fallbackError: async (error) => {
    if (error instanceof ApolloError) {
      // expected errors
      return error;
    } else if (error instanceof Error) {
      return error;
      // unexpected errors
      // return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
    } else {
      console.error('The resolver threw something that is not an error.')
      console.error(error);
      // return error
      return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
    }
  },
});

