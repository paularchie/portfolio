/// <reference types="cypress" />
import { mount } from 'cypress-react-unit-test'
import HomePage from '../../pages';

describe('Home page', () => {
  it('Renders home page component', () => {
    mount(<HomePage />)
    
    cy.get('h1').contains('Home Page');
  })
})
