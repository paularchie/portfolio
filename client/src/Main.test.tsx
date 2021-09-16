/// <reference types="cypress" />
import { mount } from '@cypress/react';
import React from 'react';
import { logoutQuery } from '@portfolio/common/build/graphql/queries';
import { User } from '@portfolio/common/build/types';
import Main from './Main';
import client from './common/utils/client';
import { MockIntegrationSetup } from './__test__/mocks/setup.mock';

describe('Main', () => {
  it('displays the "Login" and "Sign Up" nav options if a user is not signed in', () => {
    renderComponent();

    cy.contains('Home');
    cy.contains('Log in');
    cy.contains('Sign up');
  });

  it('redirects to the correct url when a nav item has been clicked', () => {
    renderComponent();

    cy.contains('Log in').click();
    cy.location('pathname').should('eq', '/login');

    cy.contains('Home').click();
    cy.location('pathname').should('eq', '/');

    cy.contains('Sign up').click();
    cy.location('pathname').should('eq', '/signup');
  });

  it('displays a "user" icon in the nav bar if a user is signed in', () => {
    renderComponent({ id: 'user-id', email: 'user@test.com' });

    cy.contains('Home');
    cy.contains('Log in').should('not.exist');
    cy.contains('Sign up').should('not.exist');

    cy.get('svg').should('have.attr', 'data-icon', 'user');

    getUserIcon().trigger('mouseover');
    cy.contains('Log out');
  });

  it('calls the sign out API', () => {
    renderComponent({ id: 'user-id', email: 'user@test.com' });
    cy.spy(client, 'request');

    getUserIcon().trigger('mouseover');
    cy.contains('Log out')
      .click()
      .then(() => {
        expect(client.request).to.have.been.calledWith(logoutQuery);
      });
  });
});

function renderComponent(user?: User) {
  mount(
    <MockIntegrationSetup user={user}>
      <Main />
    </MockIntegrationSetup>
  );
}

function getUserIcon() {
  return cy.get('[data-cy="user-icon"]');
}
