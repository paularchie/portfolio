import React from 'react';
import SignUp from '../src/modules/auth/SignUp/SignUp';
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
              path="/"
              exact
              render={() => <div>Successfully redirected to Home Page</div>}
            />
            <Route path="*" render={() => <SignUp />} />
          </Switch>
        </BrowserRouter>
      </HttpErrorProvider>
    </MockClientProvider>
  );
};

export const Default = Template().bind({});
