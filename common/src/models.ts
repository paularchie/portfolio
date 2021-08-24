import { enumType, inputObjectType, objectType, unionType } from "nexus";



export const RolesEnum = enumType({
  name: "Roles",
  members: ['ADMIN', 'USER'],
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
    t.nonNull.string("email");
    t.nonNull.string("password");
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

export const GenericError = objectType({
  name: "Error",
  definition(t) {
    t.nonNull.string("message");
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

export const SignUpResult = unionType({
  name: "SignUpResult",
  definition(t) {
    t.members("User", "ValidationErrorResponse");
  },
  resolveType(t) {
    // @ts-ignore
    return t.__typename;
  },
});

export const AuthenticationErrorResponse = objectType({
  name: 'AuthenticationErrorResponse',
  definition(t) {
    t.nonNull.list.nonNull.field("errors", {
      type: GenericError,
    });
  },
})

export const LoginResult = unionType({
  name: "LoginResult",
  definition(t) {
    t.members("User", "AuthenticationErrorResponse");
  },
  resolveType(t) {
    // @ts-ignore
    return t.__typename;
  },
});
