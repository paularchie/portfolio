
import getPort, { makeRange } from "get-port";
import { GraphQLClient } from "graphql-request";
import prisma from "../src/utils/prisma.util";
import { app } from "../src/app";
import { createSessionToken } from "../src/utils/auth.util";
import { Server } from "http";
import { Prisma, PrismaClient, Role } from "@prisma/client";
const { Client } = require("pg");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

export const TEST_DB_URL = 'postgresql://postgres:admin@localhost:5432/portfolio?schema=test';

type TestContext = {
  prisma: PrismaClient;
  request: (query: string, variables?: {}) => Promise<any>;
  requestAsAdmin: (query: string, variables?: {}) => Promise<any>;
  requestAsUser: (user: Partial<Prisma.UserCreateInput>, query: string, variables?: {}) => Promise<any>;
};

export function createTestContext(): TestContext {
  let graphQLClient: GraphQLClient;
  let serverInstance: Server;

  let ctx = {} as TestContext;

  async function createServer(): Promise<{ server: Server, port: number }> {
    const port = await getPort({ port: makeRange(5001, 6000) });
    const server = await app.listen({ port });
    server.on("close", async () => {
      prisma.$disconnect();
    });
    return { server, port };
  }

  beforeAll(async () => {
    const { server, port } = await createServer();
    serverInstance = server;
    graphQLClient = await new GraphQLClient(`http://localhost:${port}/graphql`);
    Object.assign(ctx, {
      prisma,
      request,
      requestAsAdmin,
      requestAsUser
    });
  });

  afterAll(async () => {
    await serverInstance.close();
    await resetDB();
  });

  beforeEach(async () => {
    await resetDB();
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  async function request(query, variables) {
    graphQLClient.setHeader('Cookie', '');
    return graphQLClient.request(query, variables);
  }

  async function requestAsAdmin(query, variables) {
    const token = await createSessionToken({ id: 1, role: Role.ADMIN });
    graphQLClient.setHeader('Cookie', `SESSION=${token}`);
    return graphQLClient.request(query, variables);
  }

  async function requestAsUser(user, query, variables) {
    const token = await createSessionToken({ id: user.id, role: user.role });
    graphQLClient.setHeader('Cookie', `SESSION=${token}`);
    return graphQLClient.request(query, variables);
  }

  return ctx;
}

export async function resetDB() {
  const client = new Client({
    connectionString: TEST_DB_URL,
  });
  await client.connect();
  await client.query(`DROP SCHEMA IF EXISTS "test" CASCADE`);
  await client.end();
  await applySchema();
}

async function applySchema() {
  await exec('npx prisma db push');
}

export const createFactory = <T>(model: string, defaultAttrs: () => Promise<Partial<T>>) => {
  const build = async (attrs: Partial<T> = {}) => {
    return {
      ...await defaultAttrs(),
      ...attrs
    } as T;
  }

  const create = async (attrs: Partial<T> = {}): Promise<T> => {
    return await prisma[model].create({
      data: await build(attrs)
    });
  }

  const createMany = async (count: number, attrs: Partial<T> = {}): Promise<Array<T>> => {
    const entities: Array<T> = []

    for (let i = 0; i < count; i++) {
      const entity = await prisma[model].create({
        data: await build(attrs)
      });
      entities.push(entity);
    }

    return entities;
  }

  return { build, create, createMany };
}