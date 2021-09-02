import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from '../src/Main';
import { HttpErrorProvider } from '../src/common/contexts/HttpErrorContext';
import MockClientProvider from '../src/__test__/mocks/QueryClientProvider.mock';

export default {
  title: 'App Container'
};

const NoUserTemplate = (): JSX.Element => {
  return (
    <MockClientProvider>
      <HttpErrorProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </HttpErrorProvider>
    </MockClientProvider>
  );
};

export const Default = NoUserTemplate.bind({});

const WithUserTemplate = (): JSX.Element => {
  return (
    <MockClientProvider user={{ id: 'user-id', email: 'user@test.com' }}>
      <HttpErrorProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </HttpErrorProvider>
    </MockClientProvider>
  );
};

export const WithLoggedInUser = WithUserTemplate.bind({});
