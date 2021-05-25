import { QueryClient, QueryClientProvider } from "react-query";

import React from "react";
import SignInPage from "../src/auth/SignInPage";
import mockServer from "../src/common/mocks/server";

export default {
  component: SignInPage,
  title: "SignIn Page"
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
