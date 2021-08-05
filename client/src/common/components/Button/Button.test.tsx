/// <reference types="cypress" />
import React from 'react';
import { mount } from '@cypress/react';
import Button, { ButtonProps, ButtonTypes } from './Button';

const buttonText = 'dummy text';
const commonProps: ButtonProps = {
  buttonText: buttonText
};

describe('Button component', () => {
  it('renders a button with text', () => {
    mount(<Button {...commonProps} />);

    cy.get('button').contains(buttonText);
  });

  it('renders different types of button', () => {
    const buttonTypes = Object.values(ButtonTypes);

    buttonTypes.forEach((buttonType) => {
      const props = {
        ...commonProps,
        buttonType
      };
      mount(<Button {...props} />);

      cy.get('button').should('have.class', `btn-${buttonType}`);
    });
  });

  it('makes a button disabled', () => {
    const props = {
      ...commonProps,
      disabled: true
    };
    mount(<Button {...props} />);

    cy.get('button').should('have.attr', 'disabled');
  });

  it('triggers onClick callback', () => {
    const props: ButtonProps = {
      ...commonProps,
      onClick: cy.stub().as('handleClick')
    };
    mount(<Button {...props} />);

    cy.get('button').click();

    cy.get('@handleClick').should((stub) => {
      expect(stub).to.have.been.calledOnce;
    });
  });
});
