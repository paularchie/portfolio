import { mount } from '@cypress/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MockClientProvider from './QueryClientProvider.mock';
import { HttpErrorProvider } from '../../common/contexts/HttpErrorContext';

export const createIntegrationTestSetup = (Component: React.FC) => {
  return mount(
    <MockClientProvider>
      <HttpErrorProvider>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </HttpErrorProvider>
    </MockClientProvider>
  );
};
