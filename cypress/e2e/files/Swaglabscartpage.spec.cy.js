/// <reference types="cypress" />
import { type } from "os";
import Swaglabslogin from "../../page-objects/pages/Swaglabslogin";
import SwagProducts from "../../page-objects/pages/SwagProducts";

describe('Shopping Page Verification', () => {
  it('to check',() =>{
    
    if (cy.url().should('include', '/inventory')) {
      cy.get('#add-to-cart-sauce-labs-bike-light').should('be.visible');
      cy.get('#add-to-cart-sauce-labs-bike-light').click();
    } else {
      return;
    }
    if (cy.url().should('include', '/inventory')) {
      cy.get('#add-to-cart-sauce-labs-fleece-jacket').should('be.visible');
      cy.get('#add-to-cart-sauce-labs-fleece-jacket').click();
    } else {
      return;
    }
  });

it('should navigate to Your cart page when clicking on Cart icon (when cart is empty)', () => {
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart');
    
});

it('should have "continue to shopping" button in Your cart page', () => {
  cy.get('.shopping_cart_link').click();
  cy.get('#continue-shopping').should('exist')
});

it('should display all items of product when clicking on "All items" from View cart page', () => {
  cy.get('#react-burger-menu-btn').click();
  cy.get('#inventory_sidebar_link').click();
  cy.get('.inventory_item').should('have.length', 6);
});

    it('should display Quantity, Price, Product name, and Product description in view cart page', () => {
      //cy.get('#add-to-cart-sauce-labs-bike-light').click();
      cy.get('.shopping_cart_link').click();
      Swaglabslogin.checkexist('.cart_quantity');
      Swaglabslogin.checkexist('.cart_desc_label');
      Swaglabslogin.checkexist('.cart_quantity_label');
      cy.get('#item_0_title_link').siblings('div.inventory_item_desc').should('exist');
      cy.get('#item_0_title_link').find('div.inventory_item_name').should('exist');
      cy.get('#item_5_title_link').siblings('div.inventory_item_desc').should('exist');
      cy.get('#item_5_title_link').find('div.inventory_item_name').should('exist');
    });

  it('should remove the product automatically when clicking on remove icon in view cart page', () => {
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('.shopping_cart_link').click();
    cy.get('#remove-sauce-labs-backpack').click();
    cy.get('#remove-sauce-labs-bike-light').click();
    //cy.get('#item_4_title_link').should('not.exist');
  });

  it('should display "Add to cart" when the product is removed from view cart page', () => {
    cy.get('#add-to-cart-sauce-labs-bike-light').should('exist')
    cy.get('#add-to-cart-sauce-labs-backpack').should('exist')
  });
  beforeEach(function() {
    Swaglabslogin.loggin();
})
});