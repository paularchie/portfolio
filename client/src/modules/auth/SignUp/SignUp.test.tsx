/// <reference types="cypress" />
import React from 'react';
import { mount } from '@cypress/react';
import SignUp from './SignUp';
import MockClientProvider from '../../../__test__/mocks/QueryClientProvider.mock';
import pageObjects from '../../../__test__/page-objects/global-page-objects';
import { BrowserRouter } from 'react-router-dom';
import { HttpErrorProvider } from '../../../common/contexts/HttpErrorContext';
import {
  authCredentials,
  AUTH_ERROR_MESSAGE
} from '../../../__test__/mocks/constants.mock';

describe('SignInPage', () => {
  beforeEach(() => {
    mount(
      <MockClientProvider>
        <HttpErrorProvider>
          <BrowserRouter>
            <SignUp />
          </BrowserRouter>
        </HttpErrorProvider>
      </MockClientProvider>
    );
  });

  it('has the correct input fields and Login button', () => {
    getEmailInput().should('have.attr', 'type', 'email');
    getPasswordInput().should('have.attr', 'type', 'password');
    getLoginButton().should('have.attr', 'type', 'submit');
  });

  it("button changes 'disabled' state based on the input", () => {
    getLoginButton().should('have.attr', 'disabled');

    getEmailInput().type('a').should('have.value', 'a');
    getLoginButton().should('have.attr', 'disabled');

    getPasswordInput().type('d').should('have.value', 'd');
    getLoginButton().should('not.have.attr', 'disabled');

    getPasswordInput().clear();
    getLoginButton().should('have.attr', 'disabled');
  });

  it('displays an error if incorrect credentials are provided', () => {
    getEmailInput().type('admin@test.com');
    getPasswordInput().type('password123');
    getLoginButton().click();

    getEmailInput().should('have.class', 'error-input');
    getPasswordInput().should('have.class', 'error-input');
    cy.get(pageObjects.formErrors).contains(AUTH_ERROR_MESSAGE);
  });

  it.only('redirects a user to the Home page on successful authentication', () => {
    getEmailInput().type(authCredentials.EMAIL);
    getPasswordInput().type(authCredentials.PASSWORD);
    getLoginButton().click();

    cy.location('pathname').should('eq', '/');
  });
});

function getEmailInput() {
  return cy.get("input[name='email']");
}

function getPasswordInput() {
  return cy.get("input[name='password']");
}

function getLoginButton() {
  return cy.get('button[type="submit"]');
}