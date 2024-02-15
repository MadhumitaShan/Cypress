/// <reference types="cypress" />
import { type } from "os";
import Swaglabslogin from "../../page-objects/pages/Swaglabslogin";
import SwagProducts from "../../page-objects/pages/SwagProducts";

describe('Shopping Page Verification', () => {

  it('correctly navigated to checkout page', () => {
    SwagProducts.checkout();
    cy.url().should('include', '/checkout');
  });
  it('cancel navigate to cart page', () => {
    SwagProducts.checkout();
    cy.get('#cancel').click();
    cy.url().should('eq', 'https://www.saucedemo.com/cart.html');
  }); 
  
it('continue button should navigate to checkout', () => {
  SwagProducts.checkout();
    SwagProducts.checkoutdetails();
    cy.url().should('include', '/checkout');

});
it('items in the cart equals to the final price', () => {
  cy.get('.shopping_cart_link').click();
cy.xpath('//div[@class="inventory_item_price"]/..').each(($element, index) => {
  cy.wrap($element).invoke('text').then((text) => {
    const number = parseInt(text);
    console.log(number);
    SwagProducts.checkout();
    SwagProducts.checkoutdetails();
    cy.get('.summary_info_label.summary_total_label').invoke('text').then((text) => {
      const totalPrice = parseInt(text);
      cy.log(totalPrice);
      if (number === totalPrice) {
        return true;
      }
    });
  });
});
}); 
it('cancel button is working and navigate to products page', () => {
  SwagProducts.checkout();
  SwagProducts.checkoutdetails();
  cy.get('#cancel').click();
  cy.url().should('contains','/inventory');
}); 
it('finish button is working and checkout final page', () => {
  SwagProducts.checkout();
  SwagProducts.checkoutdetails();
  cy.get('#finish').click();
  cy.url().should('contains','/checkout-complete');
}); 
it('clicking on back to products goes to product page', () => {
  SwagProducts.checkout();
  SwagProducts.checkoutdetails();
  cy.get('#finish').click();
  cy.get('#back-to-products').click();
  cy.url().should('contains','/inventory');

}); 


  beforeEach(function() {
    Swaglabslogin.loggin();
})
});