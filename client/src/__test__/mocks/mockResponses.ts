import { Response } from "miragejs";

export const login_201_res = {
  id: "user-id",
  username: "mock-user"
};

export const login_401_res = new Response(
  401,
  {},
  {
    errors: [
      {
        message: "Incorrect credentials"
      }
    ]
  }
);
