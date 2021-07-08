import { decodeJwt } from "./auth.util";
import { Context } from "./types";
import db from "../utils/prisma.util";

export const createContext = () => {
  return async ({ req, res }): Promise<Context> => {
    const authToken = req.cookies.SESSION;
    const currentUser = authToken && (await decodeJwt(authToken));
    return { db, req, res, currentUser };
  };
};
