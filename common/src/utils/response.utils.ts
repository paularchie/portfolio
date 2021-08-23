import { GraphQLErrors } from "../constants";
import { User, ValidationError } from "../types";

export const authErrorResponse = () => {
  return {
    __typename: "AuthenticationError",
    message: GraphQLErrors.AUTHENTICATION.message,
  };
};

export const validationErrorResponse = (errors: ValidationError[]) => {
  return {
    __typename: "ValidationErrorsPayload",
    errors,
  };
};

export const userResponse = (user: User) => {
  return {
    __typename: "User",
    ...user,
  };
};
