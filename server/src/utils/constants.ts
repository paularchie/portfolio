import { User } from "@prisma/client";
import { TupleUnion } from "./types";
import * as _ from 'lodash';

export const GraphQLError = {
  FORBIDDEN: {
    message: 'Unauthorized',
    code: 'FORBIDDEN'
  },
  AUTHENTICATION: {
    message: 'Incorrect credentials',
    code: 'UNAUTHENTICATED'
  }
};

const USER_SCHEMA_FIELDS: TupleUnion<keyof User> = [
  'id',
  'username',
  'email',
  'role',
  "password"
];

const USER_PRIVATE_FIELDS = ['password'];

export const USER_FIELDS = _.remove(
  USER_SCHEMA_FIELDS,
  (field: string) => !USER_PRIVATE_FIELDS.includes(field)
);