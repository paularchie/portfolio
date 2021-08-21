import { buildSchema } from "graphql";

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

  type Query {
    login(data: UserLoginInput!): LoginResult!
  }

  type AuthenticationError {
    message: String!
  }

  union LoginResult = AuthenticationError | User

`);