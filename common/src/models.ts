import { enumType, inputObjectType, objectType, unionType } from "nexus";
import { Role } from "@prisma/client";

export const RolesEnum = enumType({
  name: "Roles",
  members: [Role.ADMIN, Role.USER],
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.string("email");
    t.field("role", { type: RolesEnum });
  },
});

export const UserCreateInput = inputObjectType({
  name: "UserSignUpInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.field("role", { type: RolesEnum });
  },
});

export const UserDeleteInput = inputObjectType({
  name: "UserDeleteInput",
  definition(t) {
    t.string("id");
    t.string("username");
    t.string("email");
  },
});

export const UserLoginInput = inputObjectType({
  name: "UserLoginInput",
  definition(t) {
    t.string("email");
    t.string("password");
  },
});

export const ValidationError = objectType({
  name: "ValidationError",
  definition(t) {
    t.nonNull.string("message");
    t.nonNull.string("field");
    t.list.string("errorTypes");
  },
});
export const ValidationErrorResponse = objectType({
  name: "ValidationErrorResponse",
  definition(t) {
    t.nonNull.list.nonNull.field("errors", {
      type: ValidationError,
    });
  },
});

export const SignupResult = unionType({
  name: "SignupResult",
  definition(t) {
    t.members("User", "ValidationErrorResponse");
  },
  resolveType(t) {
    // @ts-ignore
    return t.__typename;
  },
});
