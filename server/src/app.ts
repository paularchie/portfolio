import express from "express";
import { ApolloServer } from "apollo-server-express";
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
    console.warn("GraphQL Error:", JSON.stringify(error));
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
