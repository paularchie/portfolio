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
    logout: String
    getUser: User
  }

  type Mutation {
    signUp(data: UserSignUpInput!): SignUpResult!
  }

  type AuthenticationErrorResponse {
    errors: [Error!]!
  }

  type Error {
    message: String!
  }

  type ValidationError {
    field: String!
    message: String!
    errorTypes: [String]
  }

  type ValidationErrorResponse {
    errors: [ValidationError!]!
  }

  union LoginResult = AuthenticationErrorResponse | User
  union SignUpResult = ValidationErrorResponse | User
`);
