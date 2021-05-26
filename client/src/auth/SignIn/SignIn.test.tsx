/// <reference types="cypress" />
import React from "react";
import { mount } from "@cypress/react";
import SignIn from "./SignIn";
import MockClientProvider from "../../__test__/mocks/MockClientProvider";
import { login_401_res } from "../../__test__/mocks/mockResponses";
import pageObjects from "../../__test__/page-objects/global-page-objects";

describe("SignInPage", () => {
  beforeEach(() => {
    mount(
      <MockClientProvider>
        <SignIn />
      </MockClientProvider>
    );
  });

  it("has the correct input fields and Login button", () => {
    getEmailInput().should("have.attr", "type", "email");
    getPasswordInput().should("have.attr", "type", "password");
    getLoginButton().should("have.attr", "type", "submit");
  });

  it("button changes 'disabled' state based on the input", () => {
    getLoginButton().should("have.attr", "disabled");

    getEmailInput().type("a").should("have.value", "a");
    getLoginButton().should("have.attr", "disabled");

    getPasswordInput().type("d").should("have.value", "d");
    getLoginButton().should("not.have.attr", "disabled");

    getPasswordInput().clear();
    getLoginButton().should("have.attr", "disabled");
  });

  it("displays an error if incorrect credentials are provided", () => {
    getEmailInput().type("admin@test.com");
    getPasswordInput().type("password123");
    getLoginButton().click();

    getEmailInput().should("have.class", "error-input");
    getPasswordInput().should("have.class", "error-input");
    cy.get(pageObjects.formErrors).contains(
      (login_401_res as any).data.errors[0].message
    );
  });

  //TODO: write the test when the redirection on successful authentication has been implement
  xit("should authenticate the user", () => {});
});

function getEmailInput() {
  return cy.get("input[name='email']");
}

function getPasswordInput() {
  return cy.get("input[name='password']");
}

function getLoginButton() {
  return cy.contains("Login");
}
