import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './AppContainer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './modules/home/Home';
import SignIn from './modules/auth/SignIn/SignIn';
import { HttpErrorProvider } from './common/contexts/HttpErrorContext';
import SignUp from './modules/auth/SignUp/SignUp';

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
              <Route path="/signup" component={SignUp} />
            </Switch>
          </AppContainer>
        </HttpErrorProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
