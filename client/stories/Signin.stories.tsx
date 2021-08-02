import React from "react";
import MockClientProvider from "../src/__test__/mocks/MockClientProvider";
import SignIn from "../src/modules/auth/SignIn/SignIn";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HttpErrorProvider } from "../src/common/contexts/HttpErrorContext";

export default {
  component: SignIn,
  title: "SignIn Page"
};

const Template = () => (): JSX.Element => {
  return (
    <MockClientProvider>
      <HttpErrorProvider>
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <div>Successfully redirected to Home Page</div>}
            />
            <Route path="*" render={() => <SignIn />} />
          </Switch>
        </BrowserRouter>
      </HttpErrorProvider>
    </MockClientProvider>
  );
};

export const Default = Template().bind({});
