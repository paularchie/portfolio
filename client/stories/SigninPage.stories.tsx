import React from "react";
import SignInPage from "../src/pages/auth/SignInPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { createServer, Response } from "miragejs";
// import { ReactQueryDevtools } from "react-query-devtools";

export default {
  component: SignInPage,
  title: "SignIn Page"
};

const server = (res): void => {
  createServer({
    routes() {
      this.post("/api/signin", () => res);
    }
  });
};

const queryClient = new QueryClient();

const Template = (response) => (): JSX.Element => {
  server(response);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SignInPage />
      </QueryClientProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
};

const res_200 = {
  id: "user-id",
  username: "mock-user"
};
export const Default = Template(res_200).bind({});

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
export const IncorrectCredentials = Template(res_401).bind({});
