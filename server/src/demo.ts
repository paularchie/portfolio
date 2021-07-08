import { hashPassword } from "./utils/password.util";
import prisma from "./utils/prisma.util";

async function main() {
//   await prisma.user.create({
//     data: {
//       email: "admin@test.com",
//       password: await hashPassword("admin"),
//       username: "admin",
//       roles: {
//         connect: {
//           name: "ADMIN",
//         },
//       },
//     },
//   });
const users = await prisma.user.findMany({include:{roles:true}})
console.log(JSON.stringify({users}))


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
