/// <reference types="cypress" />
import { type } from "os";
import Swaglabslogin from "../../page-objects/pages/Swaglabslogin";
describe('Shopping Page Verification', () => {
it('should have "back to product" option in product detail page', () => {
    cy.get('#back-to-products').should('be.enabled')
  });

  it('should navigate back to All products list page when clicking on "back to product" option', () => {
      cy.get('#back-to-products').click().url().should('include', '/inventory');
  });

  it('should display all items of product when clicking on "All items" from productdetail page', () => {
    cy.get('#react-burger-menu-btn').click();
    cy.get('#inventory_sidebar_link').click();
    cy.get('.inventory_item').should('have.length', 6);
  });

  it('should display "Remove" icon in red color when clicking on "Add to cart"', () => {
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.wait(6000);
    cy.get('#remove-sauce-labs-backpack').should('be.visible');
  });

  it('should change the cart count to 1 in red color when clicking on "Add to cart"', () => {
      cy.get('#add-to-cart-sauce-labs-onesie').click();
    cy.get('.shopping_cart_badge').should('have.text', '2');
    //cy.xpath('//button[@id="add-to-cart-sauce-labs-backpack"]/..').click();
    cy.get('#remove-sauce-labs-backpack').click();
    // Verify that the cart count has changed to 1
    cy.wait(6000);
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('Should navigate to product detail page when clicking on add to cart', () => {
    cy.get('#back-to-products').click()
    const products = ['a[id="item_4_title_link"]', 'a[id="item_0_title_link"]', 'a[id="item_1_title_link"]', 'a[id="item_5_title_link"]',
    'a[id="item_2_title_link"]', 'a[id="item_3_title_link"]'];
    products.forEach((product) => {
      cy.wait(3000);
      cy.get(product)
        .click();
      cy.wait(3000);
        cy.url().should('include', '/inventory-item.html?id');
        cy.get('#back-to-products').click();
    });
  });

  beforeEach(function() {
    cy.visit('https://www.saucedemo.com/'); // Visit the Sauce Labs website
    cy.get('#user-name').type('standard_user'); // Enter the username
    cy.get('#password').type('secret_sauce'); // Enter the password
    cy.get('.btn_action').click(); // Click on the login button
    cy.get('a[id="item_4_title_link"]').click();
});
});
