import "../styles/index.css";
import "../styles/custom-styles.css";

import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import ReactDOM from "react-dom";
import mockServer from "./__test__/mocks/mockServer";
import AppContainer from "./AppContainer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./modules/home/Home";
import SignIn from "./modules/auth/SignIn/SignIn";

const queryClient = new QueryClient();

mockServer();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContainer>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={SignIn} />
          </Switch>
        </AppContainer>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
