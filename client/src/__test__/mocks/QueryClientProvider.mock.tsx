import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { User } from '../../../../common/build/types';
import mockServer from './Server.mock';

const queryClient = new QueryClient();

const MockClientProvider = ({
  user,
  children
}: {
  user?: User;
  children: JSX.Element;
}): JSX.Element => {
  mockServer(user);
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default MockClientProvider;
