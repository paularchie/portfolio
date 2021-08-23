import React from 'react';
import SignIn from '../src/modules/auth/SignIn/SignIn';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HttpErrorProvider } from '../src/common/contexts/HttpErrorContext';
import MockClientProvider from '../src/__test__/mocks/QueryClientProvider.mock';
import { authCredentials } from '../src/__test__/mocks/constants.mock';

export default {
  component: SignIn,
  title: 'SignIn Page'
};

const Template = () => (): JSX.Element => {
  return (
    <MockClientProvider>
      <HttpErrorProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact render={() => <div>Successfully redirected to Home Page</div>} />
            <Route
              path="*"
              render={() => (
                <div>
                  <div>
                    <strong>Email:</strong> {authCredentials.EMAIL}
                  </div>
                  <div>
                    <strong>Password:</strong> {authCredentials.PASSWORD}
                  </div>
                  <SignIn />
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
