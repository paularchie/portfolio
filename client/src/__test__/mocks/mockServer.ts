import { createServer, Model } from "miragejs";
import { graphql, buildSchema } from "graphql";

const graphQLSchema = buildSchema(`
  type User {
    id: ID!
    email: String!
    username: String!
  }

  type Query {
    login(email: String!, password: String!): User
  }
`);

const mockServer = (): void => {
  createServer({
    models: {
      user: Model
    },
    seeds(server) {
      server.create("user", { id: "mock-id" });
    },
    routes() {
      this.post("http://localhost:4000/graphql", (schema, request) => {
        const { query, variables } = JSON.parse(request.requestBody);

        const resolver = {
          login() {
            if (variables.email === "admin@test.com" && variables.password === "admin") {
              return schema.db.user;
            }
          }
        };

        return graphql(graphQLSchema, query, resolver, null, variables);
      });
    }
  });
};

export default mockServer;
