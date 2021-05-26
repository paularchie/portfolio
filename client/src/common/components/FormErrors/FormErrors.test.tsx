/// <reference types="cypress" />
import React from "react";
import { mount } from "@cypress/react";
import FormErrors from "./FormErrors";
import pageObjects from "../../../__test__/page-objects/global-page-objects";

describe("FormErrors component", () => {
  it("renders a single error message", () => {
    const errorMessage = "Dummy error message";

    mount(<FormErrors errors={errorMessage} />);

    cy.get(pageObjects.formErrors).contains(errorMessage);
  });

  it("renders multiple error messages", () => {
    const errorMessages = [
      "Dummy error message 1",
      "Dummy error message 2",
      "Dummy error message 3"
    ];

    mount(<FormErrors errors={errorMessages} />);

    const errors = cy.get(pageObjects.formErrors);

    errors.should("have.length", errorMessages.length);
    errors.each((el, index) => {
      expect(el).to.contain(errorMessages[index]);
    });
  });
});
