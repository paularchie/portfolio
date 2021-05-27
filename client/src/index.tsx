import "../styles/index.css";
import "../styles/custom-styles.css";

import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import ReactDOM from "react-dom";
import mockServer from "./__test__/mocks/mockServer";
import AppContainer from "./AppContainer";
import AppRouter from "./AppRouter";

const queryClient = new QueryClient();

mockServer();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <AppRouter />
      </AppContainer>
    </QueryClientProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
