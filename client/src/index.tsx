import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './modules/home/Home';
import SignIn from './modules/auth/SignIn/SignIn';
import '../styles/main-styles.ts';
import { HttpErrorProvider } from './common/contexts/HttpErrorContext';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HttpErrorProvider>
          <AppContainer>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={SignIn} />
            </Switch>
          </AppContainer>
        </HttpErrorProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
