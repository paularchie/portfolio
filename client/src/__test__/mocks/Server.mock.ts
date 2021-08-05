import { createServer, Model, Response } from 'miragejs';
import { graphql, buildSchema } from 'graphql';
import { authCredentials, AUTH_ERROR_MESSAGE } from './constants.mock';

const graphQLSchema = buildSchema(`
  type User {
    id: ID!
    email: String!
    username: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type Query {
    login(data: UserLoginInput!): User
  }
`);

const mockServer = (): void => {
  createServer({
    models: {
      user: Model
    },
    seeds(server) {
      server.create('user', { id: 'mock-id' });
    },
    routes() {
      this.post('http://localhost:4000/graphql', (schema, request) => {
        const { query, variables } = JSON.parse(request.requestBody);

        const resolver = {
          login() {
            const { email, password } = variables.data;

            if (
              email === authCredentials.EMAIL &&
              password === authCredentials.PASSWORD
            ) {
              return schema.db.user;
            }
            throw new Error(AUTH_ERROR_MESSAGE);
          }
        };

        return graphql(graphQLSchema, query, resolver, null, variables);
      });
    }
  });
};

export default mockServer;
