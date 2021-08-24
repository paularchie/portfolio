import { GraphQLErrors } from "./constants";
import {
  NexusGenEnums,
  NexusGenInputs,
  NexusGenObjects,
  NexusGenUnions,
} from "./nexus";

export type GraphQLError = typeof GraphQLErrors[keyof typeof GraphQLErrors];

export type UserSignUpInput = NexusGenInputs["UserSignUpInput"];
export type SignUpResult = NexusGenUnions["SignUpResult"];
export type LoginResult = NexusGenUnions["LoginResult"];
export type UserLoginInput = NexusGenInputs["UserLoginInput"];
export type UserDeleteInput = NexusGenInputs["UserDeleteInput"];
export type User = NexusGenObjects["User"];
export type ValidationError = NexusGenObjects["ValidationError"];
export type Role = NexusGenEnums["Roles"];

export type TupleUnion<U extends string, R extends string[] = []> = {
  [S in U]: Exclude<U, S> extends never ? [...R, S] : TupleUnion<Exclude<U, S>, [...R, S]>;
}[U] &
  string[];

