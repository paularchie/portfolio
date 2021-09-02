import { mount } from '@cypress/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MockClientProvider from './QueryClientProvider.mock';
import { HttpErrorProvider } from '../../common/contexts/HttpErrorContext';
import { User } from '@portfolio/common/build/types';

export const createIntegrationTestSetup = (Component: React.FC, user?: User) => {
  return mount(
    <MockClientProvider user={user}>
      <HttpErrorProvider>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </HttpErrorProvider>
    </MockClientProvider>
  );
};

export const MockIntegrationSetup = ({
  children,
  user
}: {
  children: JSX.Element;
  user?: User;
}): JSX.Element => {
  return (
    <MockClientProvider user={user}>
      <HttpErrorProvider>
        <BrowserRouter>
        {children}
        </BrowserRouter>
      </HttpErrorProvider>
    </MockClientProvider>
  );
};
