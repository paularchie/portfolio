import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./modules/auth/SignIn/SignIn";
import Home from "./modules/home/Home";

const AppRouter = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth/signin" component={SignIn} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
