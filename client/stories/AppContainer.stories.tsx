import React from 'react';
import AppContainer from '../src/AppContainer';
import Home from '../src/modules/home/Home';
import SignIn from '../src/modules/auth/SignIn/SignIn';
import SignUp from '../src/modules/auth/SignUp/SignUp';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HttpErrorProvider } from '../src/common/contexts/HttpErrorContext';
import MockClientProvider from '../src/__test__/mocks/QueryClientProvider.mock';

export default {
  component: AppContainer,
  title: 'App Container'
};

const Template = () => (): JSX.Element => {
  return (
    <MockClientProvider user={{ id: 'user-id', email: 'user@test.com' }}>
      <BrowserRouter>
        <HttpErrorProvider>
          <AppContainer>
            <Switch>
              {/* <Route path="/" exact component={Home} /> */}
              <Route path="/login" component={SignIn} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </AppContainer>
        </HttpErrorProvider>
      </BrowserRouter>
    </MockClientProvider>
  );
};

export const Default = Template().bind({});
