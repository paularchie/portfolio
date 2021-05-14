import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignInPage from './pages/auth/SignInPage';

import '../styles/index.css';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth/signin" component={SignInPage} />
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
