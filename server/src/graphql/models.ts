import { enumType, inputObjectType, intArg, interfaceType, objectType, stringArg } from "nexus";
import { UserRolesEnum } from "../utils/constants";

const Node = interfaceType({
  name: 'Node',
  definition(t) {
    t.id('id', { description: 'GUID for a resource' })
  },
  resolveType: intArg

})

export const RolesEnum = enumType({
  name: 'Roles',
  members: [UserRolesEnum.Admin, UserRolesEnum.User]
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.implements(Node);
    t.string("email");
    t.string("username");
    t.field('role', { type: RolesEnum })
  },
});
