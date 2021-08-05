import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import mockServer from "./Server.mock";

const queryClient = new QueryClient();

const MockClientProvider = ({ children }): JSX.Element => {
  mockServer();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default MockClientProvider;
