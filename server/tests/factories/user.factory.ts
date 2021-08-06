import { User } from "@prisma/client";
import faker from 'faker';
import { hashPassword } from "../../src/utils/password.util";
import { createFactory } from "../__helpers";

const getUserDefaultAttrs = async (): Promise<Partial<User>> => {
  return {
    email: faker.internet.email(),
    password: await hashPassword(faker.internet.password())
  };
}

export const UserFactory = createFactory<User>('user', getUserDefaultAttrs);
