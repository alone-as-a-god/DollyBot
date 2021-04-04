/// <reference types="cypress" />

context("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    // cy.get("#nav").contains("About").click();
    // cy.get("#nav").contains("Commands").click();
  });

  it("cy.go() - go back or forward in the browser's history", () => {
    // https://on.cypress.io/go

    // cy.location("/").should("include", "Features");
    // cy.go("back");

    cy.location("pathname").should("include", "About");
  });

  // it("cy.reload() - reload the page", () => {
  //   // https://on.cypress.io/reload
  //   cy.reload();

  //   // reload the page without using the cache
  //   cy.reload(true);
  // });

  // it('cy.visit() - visit a remote url', () => {
  //   // https://on.cypress.io/visit

  //   // Visit any sub-domain of your current domain

  //   // Pass options to the visit
  //   cy.visit('https://example.cypress.io/commands/navigation', {
  //     timeout: 50000, // increase total time for the visit to resolve
  //     onBeforeLoad (contentWindow) {
  //       // contentWindow is the remote page's window object
  //       expect(typeof contentWindow === 'object').to.be.true
  //     },
  //     onLoad (contentWindow) {
  //       // contentWindow is the remote page's window object
  //       expect(typeof contentWindow === 'object').to.be.true
  //     },
  //   })
  //   })
});
