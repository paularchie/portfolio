/// <reference types="cypress" />
import React from "react";
import { mount } from "@cypress/react";
import SignInPage from "./SignInPage";
import { QueryClient, QueryClientProvider } from "react-query";
import mockServer from "../common/mocks/server";

describe("SignInPage", () => {
  it("renders component", () => {
    renderComponent()
  });
});

function renderComponent() {
  mockServer();

  const queryClient = new QueryClient();
  mount(
    <QueryClientProvider client={queryClient}>
      <SignInPage />
    </QueryClientProvider>
  );
}
