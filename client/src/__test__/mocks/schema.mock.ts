import { buildSchema } from 'graphql';

export const graphQLSchema = buildSchema(`
  type User {
    id: ID!
    email: String!
    role: String
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  input UserSignUpInput {
    email: String!
    password: String!
  }

  type Query {
    login(data: UserLoginInput!): LoginResult!
  }

  type Mutation {
    signUp(data: UserSignUpInput!): SignUpResult!
  }

  type AuthenticationError {
    message: String!
  }

  type ValidationError {
    errorTypes: [String]
    field: String!
    message: String!
  }

  type ValidationErrorsPayload {
    errors: [ValidationError!]!
  }

  union LoginResult = AuthenticationError | User
  union SignUpResult = ValidationErrorsPayload | User
`);
