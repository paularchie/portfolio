import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './modules/auth/SignIn/SignIn';
import SignUp from './modules/auth/SignUp/SignUp';
import Home from './modules/home/Home';

const AppRouter = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth/signin" component={SignIn} />
        <Route path="/auth/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
