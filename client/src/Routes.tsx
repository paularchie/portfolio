import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './modules/auth/SignIn/SignIn';
import SignUp from './modules/auth/SignUp/SignUp';
import Home from './modules/home/Home';

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
};

export default Routes;
