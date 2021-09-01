/// <reference types="cypress" />
import React from 'react';
import { mount } from '@cypress/react';
import pageObjects from '../../../__test__/page-objects/global-page-objects';
import NavBar from './NavBar';
import { navBarProps } from '../../../__test__/mocks/data.mock';

const { navItems, selectedKeys } = navBarProps;

describe('NavBar component', () => {
  it('renders a Nav Bar with the correct nav items and attributes', () => {
    mount(<NavBar {...navBarProps} />);

    getNavItems().should('have.length', navItems.length);
    getNavItems().each((item, index) => {
      const a = cy.get('a', { withinSubject: item });
      a.should('have.text', navItems[index].label);
      a.should('have.attr', 'href', navItems[index].url);
    });
  });

  it('selects the correct nav items', () => {
    mount(<NavBar {...navBarProps} />);

    getNavItems().each((item, index) => {
      if (selectedKeys.includes(navItems[index].key)) {
        cy.wrap(item).should('have.class', 'ant-menu-item-selected');
      } else {
        cy.wrap(item).should('not.have.class', 'ant-menu-item-selected');
      }
    });
  });

  it('triggers generic onClick callback', () => {
    mount(<NavBar {...navBarProps} onClick={cy.stub().as('onClick')} />);
    const items = getNavItems();
    const itemIndex = 1;

    items.eq(itemIndex).click();

    cy.get('@onClick').should((stub) => {
      expect(stub).to.have.been.calledWith(navItems[itemIndex].url);
    });
  });

  it('triggers onClick callback from an individual nav item, if specified', () => {
    const props = { ...navBarProps };
    const itemIndex = 2;
    props.navItems[itemIndex].onClick = cy.stub().as('onClick');
    mount(<NavBar {...navBarProps} />);

    const items = getNavItems();

    items.eq(itemIndex).click();

    cy.get('@onClick').should((stub) => {
      expect(stub).to.have.been.calledOnce;
    });
  });
});

function getNavItems() {
  return cy.get(pageObjects.navItems);
}
