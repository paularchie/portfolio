import { QueryClient, QueryClientProvider } from "react-query";
import { Response, createServer } from "miragejs";

import React from "react";
import SignInPage from "../src/auth/SignInPage";

export default {
  component: SignInPage,
  title: "SignIn Page"
};

const res_200 = {
  id: "user-id",
  username: "mock-user"
};

const res_401 = new Response(
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

const mockServer = (): void => {
  createServer({
    routes() {
      this.post("/api/signin", (schema, { requestBody }) => {
        const { email, password } = JSON.parse(requestBody);

        if (email === "admin@test.com" && password === "admin") {
          return res_200;
        } else {
          return res_401;
        }
      });
    }
  });
};

mockServer();

const queryClient = new QueryClient();

const Template = () => (): JSX.Element => {
  return (
    <>
      <div>email: admin@test.com</div>
      <div>password: admin</div>
      <QueryClientProvider client={queryClient}>
        <SignInPage />
      </QueryClientProvider>
    </>
  );
};

export const Default = Template().bind({});
