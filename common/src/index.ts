import { NexusGenEnums, NexusGenInputs, NexusGenObjects, NexusGenUnions } from "./nexus";
import { GraphQLErrors } from "./constants";

export * from '@prisma/client';

//types
export type UserSignUpInput = NexusGenInputs["UserSignUpInput"];
export type SignUpResult = NexusGenUnions["SignupResult"];
export type UserLoginInput = NexusGenInputs["UserLoginInput"];
export type UserDeleteInput = NexusGenInputs["UserDeleteInput"];
export type User = NexusGenObjects["User"];
export type ValidationError = NexusGenObjects["ValidationError"];
export type Role = NexusGenEnums["Roles"];

export type GraphQLError = typeof GraphQLErrors[keyof typeof GraphQLErrors];

import * as models from "./models";
export const Models = models;

export * from "./constants";
