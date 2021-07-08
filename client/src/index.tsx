import "../styles/index.css";
import "../styles/custom-styles.css";

import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import ReactDOM from "react-dom";
import mockServer from "./__test__/mocks/mockServer";
import AppContainer from "./AppContainer";
import AppRouter from "./AppRouter";
import { HttpErrorProvider } from "./common/contexts/HttpErrorContext";

const queryClient = new QueryClient();

// mockServer();

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

ReactDOM.render(<App />, document.getElementById("root"));
