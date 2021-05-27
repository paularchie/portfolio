import { LoginCredentials } from "./auth-types";
import http from "../../common/utils/http";

export const signIn = (credentials: LoginCredentials) => {
  return http.post("/signin", credentials);
};
