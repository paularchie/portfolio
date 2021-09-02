import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HttpErrorProvider } from './common/contexts/HttpErrorContext';
import Routes from './Routes';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HttpErrorProvider>
          <AppContainer />
        </HttpErrorProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
