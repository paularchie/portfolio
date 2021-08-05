import { AuthenticationError } from "apollo-server";
const util = require("util");
import * as path from "path";
import * as fs from "fs";
import * as jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

export const signJwt = util.promisify(jwt.sign);

const RSA_PRIVATE_KEY = fs.readFileSync(
  path.resolve(".") + "/config/private.key",
  "utf8"
);
const RSA_PUBLIC_KEY = fs.readFileSync(
  path.resolve(".") + "/config/public.key",
  "utf8"
);

const SESSION_DURATION = 60 * 60 * 24 * 365; // counted in seconds, set to one year

export function createSessionToken(user) {
  return signJwt(
    {
      id: user.id,
      role: user.role,
    },
    RSA_PRIVATE_KEY,
    {
      algorithm: "RS256",
      expiresIn: SESSION_DURATION,
      subject: JSON.stringify({ id: user.id, role: user.role }),
    }
  );
}

export async function decodeJwt(token) {
  return await jwt.verify(token, RSA_PUBLIC_KEY);
}

export const isAdmin = (user: { id: string, role: Role } | undefined): boolean => {
  return user?.role === Role.ADMIN;
}
