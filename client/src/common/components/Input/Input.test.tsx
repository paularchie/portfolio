/// <reference types="cypress" />
import React from "react";
import { mount } from "@cypress/react";
import { Input, InputTypes } from "./Input";
import pageObjects from "../../../__test__/page-objects/global-page-objects";

const commonProps = {
  id: "field-id",
  name: "field-name"
};

describe("Input component", () => {
  it("renders an input field with id and name attribute", () => {
    mount(<Input {...commonProps} />);

    const input = getInput();

    input.should("have.attr", "id", commonProps.id);
    input.should("have.attr", "name", commonProps.name);
  });

  it("renders the correct input type", () => {
    mount(<Input {...commonProps} />);

    getInput().should("have.attr", "type", InputTypes.Text);

    const props = {
      ...commonProps,
      type: InputTypes.Password
    };
    mount(<Input {...props} />);

    getInput().should("have.attr", "type", InputTypes.Password);
  });

  it("renders input with a placeholder", () => {
    const props = {
      ...commonProps,
      placeholder: "Placeholder text"
    };
    mount(<Input {...props} />);

    getInput().should("have.attr", "placeholder", props.placeholder);
  });

  it("renders input with label", () => {
    const props = {
      ...commonProps,
      label: "Label text"
    };
    mount(<Input {...props} />);

    const label = cy.get("label");
    label.contains(props.label);
    label.should("have.attr", "for", props.id);
  });

  it("should have a class name passed through props", () => {
    const props = {
      ...commonProps,
      className: "input-field"
    };
    mount(<Input {...props} />);

    getInput().should("have.class", props.className);
  });

  it("should display error message", () => {
    const props = {
      ...commonProps,
      errors: "Error text"
    };
    mount(<Input {...props} />);

    cy.get(pageObjects.formErrors).contains(props.errors);
    getInput().should("have.class", "error-input");
  });

  it("triggers onChange callback", () => {
    const props = {
      ...commonProps,
      onChange: cy.stub().as("handleChange")
    };
    mount(<Input {...props} />);

    const value = "abc";
    getInput().type(value);

    cy.get("@handleChange").should((stub) => {
      expect(stub).to.have.been.calledWith(value, props.name);
    });
  });
});

function getInput() {
  return cy.get(pageObjects.inputField);
}
