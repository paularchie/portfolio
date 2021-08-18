import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import { schema } from './schema';
import { createContext } from './utils/context.util';
import { permissions } from './utils/rules.util';
import { applyMiddleware, IMiddlewareGenerator } from 'graphql-middleware';
import { Mutation } from './graphql/Mutations';

const corsOptions = {
  origin: `http://localhost:5000`,
  credentials: true
};

const app = express();

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext(),
  formatError: (error) => {
    console.dir({ error }, { depth: null });
    // if (process.env.NODE_ENV !== 'test') {
    //   console.dir({ error }, { depth: null });
    // }
    return error;
  },
  playground: {
    settings: {
      'request.credentials': 'include'
    }
  }
});

server.start();

app.use(cookieParser());
server.applyMiddleware({
  app,
  cors: corsOptions,
  path: '/graphql'
});

export { app, server };
