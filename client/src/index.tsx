import "../styles/index.css";
import "../styles/custom-styles.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import ReactDOM from "react-dom";
import SignInPage from "./auth/SignInPage";
import mockServer from "./common/mocks/server";
import AppContainer from "./AppContainer";

const queryClient = new QueryClient();

mockServer();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <BrowserRouter>
          <Switch>
            <Route path="/auth/signin" component={SignInPage} />
          </Switch>
        </BrowserRouter>
      </AppContainer>
    </QueryClientProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
