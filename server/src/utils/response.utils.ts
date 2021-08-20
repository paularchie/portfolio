import { GraphQLErrors, User, ValidationError } from '@portfolio/common';

export const authErrorResponse = () => {
  return {
    __typename: 'AuthenticationError',
    message: GraphQLErrors.AUTHENTICATION.message
  };
};

export const validationErrorResponse = (errors: ValidationError[]) => {
  return {
    __typename: 'ValidationErrorsPayload',
    errors
  };
};

export const userResponse = (user: User) => {
  return {
    __typename: 'User',
    ...user
  };
};
