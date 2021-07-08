import express from "express";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import cookieParser from "cookie-parser";
import { schema } from "./schema";
import { createContext } from "./utils/context.util";
import { permissions } from "./utils/rules.util";
import { applyMiddleware } from "graphql-middleware";

const corsOptions = {
  origin: `http://localhost:5000`,
  credentials: true,
};

const app = express();
const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext(),
  formatError: (error) => {
    console.log({error})
    console.warn("GraphQL Error:", error);
    return error;
  },
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
});

server.start();

app.use(cookieParser());
server.applyMiddleware({
  app,
  cors: corsOptions,
  path: "/graphql",
});

export { app, server };
