import { app } from "../src/app";
import { Database } from "sqlite3";
import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import getPort, { makeRange } from "get-port";
import { GraphQLClient } from "graphql-request";
import db from "../src/utils/prisma.util";
import { Server } from "http";

type TestContext = {
  client: GraphQLClient;
  db: PrismaClient;
};

export function createTestContext(): TestContext {
  let ctx = {} as TestContext;
  const graphqlCtx = graphqlTestContext();
  const prismaCtx = prismaTestContext();

  beforeEach(async () => {
    const client = await graphqlCtx.before();
    const db = await prismaCtx.before();
    Object.assign(ctx, {
      client,
      db,
    });
  });

  afterEach(async () => {
    await graphqlCtx.after();
    await prismaCtx.after();
  });

  return ctx;
}

function graphqlTestContext() {
  let serverInstance;

  return {
    async before() {
      const { server, port } = await createServer();
      serverInstance = server;
      return createClient(port);
    },
    async after() {
      serverInstance.close();
    },
  };
}

function prismaTestContext() {
  let prismaClient: null | PrismaClient = null;

  return {
    async before() {
      execSync("yarn db:push");
      prismaClient = new PrismaClient();
      return prismaClient;
    },
    async after() {
      // Drop the schema after the tests have completed
      const client = new Database(":memory:");
      await client.close();
      await prismaClient?.$disconnect();
    },
  };
}

async function createServer() /*: Promise<Server> */ {
  const port = await getPort({ port: makeRange(5001, 6000) });
  const server = await app.listen({ port });
  server.on("close", async () => {
    db.$disconnect();
  });
  return { server, port };
}

function createClient(port) {
  return new GraphQLClient(`http://localhost:${port}/graphql`, {
    headers: {
      Cookie:
        "SESSION=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAyLCJpYXQiOjE2MjU0MjM3MjIsImV4cCI6MTY1Njk1OTcyMiwic3ViIjoie1wiaWRcIjoyMDJ9In0.Y3JX9TbQYGamajDkz9rr3HmPg6I8PMutuEqehKqB02Zq789E3xnbIFJ6ttp3Jt552oy1sBVhuMn8-ZI8k3Ybcw",
    },
  });
}
