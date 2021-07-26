
import getPort, { makeRange } from "get-port";
import { GraphQLClient } from "graphql-request";
import db from "../src/utils/prisma.util";
import { app } from "../src/app";
import { createSessionToken } from "../src/utils/auth.util";
import { Server } from "http";
import { UserRolesEnum } from "../src/utils/constants";

type TestContext = {
  client: GraphQLClient;
  loginAsUser: () => Promise<void>;
  loginAsAdmin: () => Promise<void>;
};

export function createTestContext(): TestContext {
  let gqlClient: GraphQLClient;
  let serverInstance: Server;

  const ctx = {
    loginAsAdmin,
    loginAsUser
  } as TestContext;

  async function createServer(): Promise<{ server: Server, port: number }> {
    const port = await getPort({ port: makeRange(5001, 6000) });
    const server = await app.listen({ port });
    server.on("close", async () => {
      db.$disconnect();
    });
    return { server, port };
  }

  async function createGraphQLClient(port) {
    gqlClient = new GraphQLClient(`http://localhost:${port}/graphql`)
    return gqlClient;
  }

  beforeEach(async () => {
    const { server, port } = await createServer();
    serverInstance = server;
    const client = await createGraphQLClient(port);
    ctx.client = client;
  })

  afterEach(() => {
    serverInstance.close();
  })

  async function loginAsUser(): Promise<void> {
    await login(UserRolesEnum.User);
  }

  async function loginAsAdmin(): Promise<void> {
    await login(UserRolesEnum.Admin);
  }

  async function login(role: UserRolesEnum): Promise<void> {
    const token = await createSessionToken({ id: 1, role });
    gqlClient.setHeader('Cookie', `SESSION=${token}`)
  }

  return ctx;
}