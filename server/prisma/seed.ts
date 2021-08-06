import prisma from '../src/utils/prisma.util';
import { UserFactory } from '../tests/factories/user.factory';
import { Role } from '@prisma/client';
import { hashPassword } from '../src/utils/password.util';
const { Client } = require('pg');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function main() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  await resetDB();

  await UserFactory.createMany(30);
  await UserFactory.create({
    email: 'admin@protonmail.com',
    password: await hashPassword('admin'),
    role: Role.ADMIN
  });
  await UserFactory.create({
    email: 'adam@protonmail.com',
    password: await hashPassword('adam')
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function resetDB() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  await client.connect();
  await client.query(`DROP SCHEMA IF EXISTS "dev" CASCADE`);
  await client.end();

  await exec('npx prisma db push');
}
