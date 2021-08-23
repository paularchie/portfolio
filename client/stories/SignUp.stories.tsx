import React from 'react';
import SignUp from '../src/modules/auth/SignUp/SignUp';
import SignIn from '../src/modules/auth/SignIn/SignIn';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HttpErrorProvider } from '../src/common/contexts/HttpErrorContext';
import MockClientProvider from '../src/__test__/mocks/QueryClientProvider.mock';
import { authCredentials } from '../src/__test__/mocks/constants.mock';

export default {
  component: SignUp,
  title: 'SignUp Page'
};

const Template = () => (): JSX.Element => {
  return (
    <MockClientProvider>
      <HttpErrorProvider>
        <BrowserRouter>
          <Switch>
            <Route
              path="/login"
              exact
              render={() => <div>Successfully redirected to Login Page</div>}
            />
            <Route
              path="*"
              render={() => (
                <div>
                  <div>
                    <strong>Existing user's email:</strong> {authCredentials.EMAIL}
                  </div>
                  <SignUp />
                </div>
              )}
            />
          </Switch>
        </BrowserRouter>
      </HttpErrorProvider>
    </MockClientProvider>
  );
};

export const Default = Template().bind({});
