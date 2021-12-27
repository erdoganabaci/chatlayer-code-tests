/// <reference types="cypress" />

describe("test input", () => {
  before(() => {
    cy.visit("/");
  });

  it("checks input typing works", () => {
    // checking input works well
    cy.get("[data-testid=user-input]").type("hello");
    cy.get("[data-testid=user-button]").click();
    // check is span conatin hello
    cy.get("[data-testid=user-message-list]").find("span").contains("hello");
  });
});
