/// <reference types="cypress" />
import { mount } from 'cypress-react-unit-test';
import Button, { ButtonProps } from '../../components/Button/Button';

const dummyText = 'some text';
const buttonProps: ButtonProps = {
  buttonText: dummyText
};

describe('Button component', () => {
  it('Renders a Button component with text', () => {
    mount(<Button {...buttonProps} />);

    cy.get('button').contains(dummyText);
  });

  it('Triggers onClick callback', () => {
    const props: ButtonProps = {
      ...buttonProps,
      onClick: cy.stub().as('handleClick')
    };
    mount(<Button {...props} />);

    cy.get('button').click();

    cy.get('@handleClick').should((stub) => {
      expect(stub).to.have.been.calledOnce;
    });
  });
});
