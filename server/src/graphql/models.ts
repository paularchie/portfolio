import { Role } from "@prisma/client";
import { enumType, inputObjectType, objectType } from "nexus";

export const RolesEnum = enumType({
  name: 'Roles',
  members: [Role.ADMIN, Role.USER]
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.id('id');
    t.string("email");
    t.string("username");
    t.field('role', { type: RolesEnum })
  },
});

export const UserCreateInput = inputObjectType({
  name: "UserCreateInput",
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('username');
    t.nonNull.string('password');
    t.field('role', { type: RolesEnum });
  }
});

export const UserDeleteInput = inputObjectType({
  name: "UserDeleteInput",
  definition(t) {
    t.string('id');
    t.string('username');
    t.string('email');
  }
});

export const UserLoginInput = inputObjectType({
  name: "UserLoginInput",
  definition(t) {
    t.string('email');
    t.string('password');
  }
});
