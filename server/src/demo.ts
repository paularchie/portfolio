import { hashPassword } from "./utils/password.util";
import prisma from "./utils/prisma.util";

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     email: "admin2@test.com",
  //     password: await hashPassword("admin"),
  //     username: "admin2",
  //     role: 'ADMIN'
  //   }
  // });

  const user = await prisma.user.findMany({
    where: {
      role: 'ADMIN'
    },
    select: {
      username: true,
      role: true
    }
  }
  )


  // const result = { ...user, roles: user.userRoles.map(x => x.roles.name) }


  console.dir(user, { depth: null })
  // const users = await prisma.user.findMany({include:{roles:true}})
  // const role = await prisma.roles.createMany({data: {
  //   name: 'ADMIN'
  // }});

  // const users = await prisma.users.findMany({
  //   include: {
  //       userRoles: {
  //         select: {
  //           roles: {
  //             select: {
  //               name: true
  //             }   
  //           }
  //         }
  //     }
  //   },
  //   where: {
  //     id: 1
  //   }
  // })

  // const users = await prisma.users.findMany({
  //   where: {
  //     userRoles: {
  //       some: {
  //         roles: {
  //           name: "ADMIN"
  //         }
  //       }
  //     }
  //   },
  //   select: {
  //     username: true
  //   }

  // where: {
  //   id: 1
  // },
  // include: {
  //   roles: {
  //     select: {
  //       name: true
  //     }
  //   },
  //   users: {
  //     select: {
  //       username: true
  //     }
  //   }
  // }
  // })


  // console.log(JSON.stringify(users))


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
