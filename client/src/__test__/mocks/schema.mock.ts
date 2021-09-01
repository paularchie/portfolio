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
    getUser: User
    logout: String
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
    errorTypes: [String]
    field: String!
    message: String!
  }

  type ValidationErrorResponse {
    errors: [ValidationError!]!
  }

  union LoginResult = AuthenticationErrorResponse | User
  union SignUpResult = ValidationErrorResponse | User
`);
