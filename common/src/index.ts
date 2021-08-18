import { NexusGenEnums, NexusGenInputs, NexusGenObjects } from "./nexus";
import { GraphQLErrors } from "./constants";

//types
export type UserSignUpInput = NexusGenInputs["UserSignUpInput"];
export type UserLoginInput = NexusGenInputs["UserLoginInput"];
export type UserDeleteInput = NexusGenInputs["UserDeleteInput"];
export type User = NexusGenObjects["User"];
export type ValidationError = NexusGenObjects["ValidationError"];
export type ValidationErrors = NexusGenObjects["ValidationErrors"];
export type Role = NexusGenEnums["Roles"];

export type GraphQLError = typeof GraphQLErrors[keyof typeof GraphQLErrors];

import * as models from "./models";
export const Models = models;

export * from "./constants";
