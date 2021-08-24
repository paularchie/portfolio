import { TupleUnion, User } from "./types";

export const GraphQLErrors = {
  FORBIDDEN: {
    message: "Unauthorized",
    code: "FORBIDDEN",
  },
  AUTHENTICATION: {
    message: "Incorrect credentials",
    code: "UNAUTHENTICATED",
  },
};



export const USER_FIELDS: TupleUnion<keyof User> = ['id', 'email', 'role'];
