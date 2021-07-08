import prisma from "../src/utils/prisma.util";
import faker from "faker";

async function main() {
  //   if (process.env.NODE_ENV !== "development") {
  //     return;
  //   }

  // await prisma.user.create({
  //   data: {
  //     email: "admin@test.com",
  //     password: "admin",
  //     username: "admin",
  //     roles: {
  //       create: {
  //         name: "ADMIN",
  //       },
  //     },
  //   },
  // });

  

  // const user = await prisma.ser.findMany({ include: { roles: true } });
  // const roles = await prisma.userRoles.findMany({ include: { users: true } });
  // console.dir(JSON.stringify({ roles }));

  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: "admin@test.com",
      password: "admin",
      username: "admin",
      roles: {
        create: [
          {
            name: "ADMIN",
          },
          {
            name: "USER",
          },
        ],
      },
    },
  });

  const user = await prisma.user.findMany({
    where: { roles: { some: { name: "ADMIN" } } },
  });
  console.log({ user });

  prisma.user.create({ data: {} });
  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        // roles
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
