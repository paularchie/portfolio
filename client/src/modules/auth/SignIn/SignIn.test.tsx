/// <reference types="cypress" />
import SignIn from './SignIn';
import pageObjects from '../../../__test__/page-objects/global-page-objects';
import { authCredentials, AUTH_ERROR_MESSAGE } from '../../../__test__/mocks/constants.mock';
import { createIntegrationTestSetup } from '../../../__test__/mocks/setup.mock';
import client from '../../../common/utils/client';
import { loginQuery } from '../../../../../common/build/graphql/queries';

describe('SignInPage', () => {
  beforeEach(() => createIntegrationTestSetup(SignIn));

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

  it('calls the API with a correct payload on the form submission', () => {
    const email = 'test@protonmail.com';
    const password = 'Pdhjh390dd@';
    cy.spy(client, 'request');

    getEmailInput().type(email);
    getPasswordInput().type(password);
    getLoginButton()
      .click()
      .then(() => {
        expect(client.request).to.have.been.calledWith(loginQuery, {
          data: { email, password }
        });
      });
  });

  it('displays an error if incorrect credentials are provided', () => {
    getEmailInput().type('admin@test.com');
    getPasswordInput().type('password123');
    getLoginButton().click();

    getEmailInput().should('have.class', 'error-input');
    getPasswordInput().should('have.class', 'error-input');
    cy.get(pageObjects.formErrors).contains(AUTH_ERROR_MESSAGE);
  });

  it('redirects a user to the Home page on successful authentication', () => {
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
