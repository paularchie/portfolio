import React from "react";
import MockClientProvider from "../src/__test__/mocks/MockClientProvider";
import SignIn from "../src/auth/SignIn/SignIn"; 
export default {
  component: SignIn,
  title: "SignIn Page"
};

const Template = () => (): JSX.Element => {
  return (
    <>
      <div>email: admin@test.com</div>
      <div>password: admin</div>
      <MockClientProvider>
        <SignIn />
      </MockClientProvider>
    </>
  );
};

export const Default = Template().bind({});
