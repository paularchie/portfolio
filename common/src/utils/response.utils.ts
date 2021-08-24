import { GraphQLErrors } from "../constants";
import { User, ValidationError } from "../types";

export const authErrorResponse = () => {
  return {
    __typename: "AuthenticationErrorResponse",
    errors: [
      {
        message: GraphQLErrors.AUTHENTICATION.message,
      },
    ],
  };
};

export const validationErrorResponse = (errors: ValidationError[]) => {
  return {
    __typename: "ValidationErrorResponse",
    errors,
  };
};

export const userResponse = (user: User) => {
  return {
    __typename: "User",
    ...user,
  };
};
