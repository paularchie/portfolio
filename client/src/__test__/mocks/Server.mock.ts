import { createServer, Model } from 'miragejs';
import { graphql } from 'graphql';
import { authCredentials, EMAIL_IN_USE_ERROR_MESSAGE } from './constants.mock';
import { graphQLSchema } from './schema.mock';
import {
  authErrorResponse,
  userResponse,
  validationErrorResponse
} from '@portfolio/common/build/utils';

const mockServer = (): void => {
  createServer({
    models: {
      user: Model
    },
    seeds(server) {
      // server.create('user', {
      //   id: 'mock-id'
      // });
    },
    routes() {
      this.post('http://localhost:4000/graphql', (schema, request) => {
        const { query, variables } = JSON.parse(request.requestBody);

        const resolver = {
          login() {
            const { email, password } = variables.data;

            if (email === authCredentials.EMAIL && password === authCredentials.PASSWORD) {
              return userResponse({
                id: 'user-id',
                email
              });
            }

            return authErrorResponse();
          },
          signUp() {
            const { email } = variables.data;

            if (email === authCredentials.EMAIL) {
              return validationErrorResponse([
                {
                  message: EMAIL_IN_USE_ERROR_MESSAGE,
                  field: 'email'
                }
              ]);
            }

            return userResponse({
              id: 'user-id',
              email
            });
          }
        };

        return graphql(graphQLSchema, query, resolver, null, variables);
      });
    }
  });
};

export default mockServer;
