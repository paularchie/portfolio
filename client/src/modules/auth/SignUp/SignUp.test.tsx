/// <reference types="cypress" />
import SignUp from './SignUp';
import pageObjects from '../../../__test__/page-objects/global-page-objects';
import {
  authCredentials,
  EMAIL_IN_USE_ERROR_MESSAGE
} from '../../../__test__/mocks/constants.mock';
import { createIntegrationTestSetup } from '../../../__test__/mocks/setup.mock';
import client from '../../../common/utils/client';
import { signUpMutation } from '@portfolio/common/build/graphql/mutations';

describe('SignInPage', () => {
  beforeEach(() => createIntegrationTestSetup(SignUp));

  it('has the correct input fields and Sign Up button', () => {
    getEmailInput().should('have.attr', 'type', 'email');
    getPasswordInput().should('have.attr', 'type', 'password');
    getSignUpButton().should('have.attr', 'type', 'submit');
  });

  it("button changes 'disabled' state based on the input", () => {
    getSignUpButton().should('have.attr', 'disabled');

    getEmailInput().type('a').should('have.value', 'a');
    getSignUpButton().should('have.attr', 'disabled');

    getPasswordInput().type('d').should('have.value', 'd');
    getSignUpButton().should('not.have.attr', 'disabled');

    getPasswordInput().clear();
    getSignUpButton().should('have.attr', 'disabled');
  });

  it('calls the API with a correct payload on the form submission', () => {
    const email = 'test@protonmail.com';
    const password = 'Pdhjh390dd@';
    cy.spy(client, 'request');

    getEmailInput().type(email);
    getPasswordInput().type(password);
    getSignUpButton()
      .click()
      .then(() => {
        expect(client.request).to.have.been.calledWith(signUpMutation, {
          data: { email, password }
        });
      });
  });

  it('displays an error if provided email address is in use', () => {
    getEmailInput().type(authCredentials.EMAIL);
    getPasswordInput().type('password123');
    getSignUpButton().click();

    getEmailInput().should('have.class', 'error-input');
    getPasswordInput().should('not.have.class', 'error-input');
    cy.get(pageObjects.formErrors).contains(EMAIL_IN_USE_ERROR_MESSAGE);
  });

  it('redirects a user to the Login page on successful account creation', () => {
    getEmailInput().type('test@protonmail.com');
    getPasswordInput().type('Pdhjh390dd@');
    getSignUpButton().click();

    cy.location('pathname').should('eq', '/login');
  });
});

function getEmailInput() {
  return cy.get("input[name='email']");
}

function getPasswordInput() {
  return cy.get("input[name='password']");
}

function getSignUpButton() {
  return cy.get('button[type="submit"]');
}
