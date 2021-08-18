import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import AppRouter from './AppRouter';
import { HttpErrorProvider } from './common/contexts/HttpErrorContext';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <HttpErrorProvider>
        <AppContainer>
          <AppRouter />
        </AppContainer>
      </HttpErrorProvider>
    </QueryClientProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
