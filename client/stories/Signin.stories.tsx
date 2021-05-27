import React from "react";
import MockClientProvider from "../src/__test__/mocks/MockClientProvider";
import SignIn from "../src/modules/auth/SignIn/SignIn";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default {
  component: SignIn,
  title: "SignIn Page"
};

const Template = () => (): JSX.Element => {
  return (
    <>
      <MockClientProvider>
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <div>Successfully redirected to Home Page</div>}
            />
            <Route
              path="*"
              render={() => (
                <div>
                  <div>email: admin@test.com</div>
                  <div>password: admin</div>
                  <SignIn />
                </div>
              )}
            />
          </Switch>
        </BrowserRouter>
      </MockClientProvider>
    </>
  );
};

export const Default = Template().bind({});
