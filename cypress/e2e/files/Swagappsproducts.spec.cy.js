/// <reference types="cypress" />
import { type } from "os";
import Swaglabslogin from "../../page-objects/pages/Swaglabslogin";
import SwagProducts from "../../page-objects/pages/SwagProducts";

describe('Shopping Page Verification', () => {


    it('should navigate to shopping page from login page', () => {
        cy.url().should('include', '/inventory.html'); // Verify that the URL contains '/inventory.html'
      })
  
      it('should display images for all products in Sauce Lab website', () => {
        cy.get('.inventory_item').each(($productImage) => {
          cy.wrap($productImage).should('be.visible');
        })
      })
  
      it('should have description for all products in Sauce Labs web page', () => {
        //cy.visit('https://www.saucelabs.com/products');
        
        // Get all product elements
        cy.get('.inventory_item').each(($product) => {
          // Check if description exists
          cy.wrap($product).find('.inventory_item_description').should('exist');
        })
      })
  
    it('should have unique description for all products', () => {
        cy.get('.inventory_item_description').then($descriptions => {
            const descriptions = $descriptions.map((index, element) => Cypress.$(element).text()).get()
        
            const uniqueDescriptions = [...new Set(descriptions)]
        
            expect(uniqueDescriptions.length).to.be.greaterThan(1)
          })
    })
  
    it('should show price for all products', () => {
        cy.get('.inventory_item').each(($product) => {
            cy.wrap($product).find('.inventory_item_price').should('exist');
          })
    })
  
    it('should have "Add to cart" button for all products', () => {
        cy.get('.inventory_item').each(($product) => {
            cy.wrap($product).get('.inventory_item_name').should('exist');
          })
    })
  
    it('should be able to click on product title', () => {
        cy.get('.inventory_item_name').each(($element) => {
            cy.wrap($element)
              .parent('a')
              .should('have.attr', 'href')
              .and('not.be.empty');
          });
    })
  
    it('should be able to click on product picture', () => {
        cy.get('[alt="Sauce Labs Backpack"]').click();
    })
  
    it('should be able to click on "Add to cart" button', () => {
      cy.xpath('//button[@id="add-to-cart-sauce-labs-backpack"]/..').click();
    })

    it('should have unique product title', () => {
      cy.get('.inventory_item_name').each(($title, index, $list) => {
        // Check if the current title is unique
        const currentTitle = $title.text();
        const isUnique = $list.filter((i, el) => {
          return el.innerText === currentTitle;
        }).length === 1;
      
        // Assert that the title is unique
        expect(isUnique).to.be.true;
      });
    })

      it('should have unique product image', () => {
        cy.get('img.inventory_item_img').each(($image, index) => {
          // Get the source attribute of the current image
          cy.wrap($image).invoke('attr', 'src').then((src) => {
            // Check if the current image is unique from all other images
            cy.get('img.inventory_item_img').each(($otherImage, otherIndex) => {
              if (index !== otherIndex) {
                cy.wrap($otherImage).invoke('attr', 'src').then((otherSrc) => {
                  expect(src).not.to.equal(otherSrc);
                });
              }
            });
          });
        });
    })
  
    it('should navigate to product detail page when clicking on product title', () => {
        cy.xpath('//div[text()="Sauce Labs Backpack"]').click();    
    });
  
    it('should navigate to product detail page when clicking on product picture', () => {
        cy.get('[alt="Sauce Labs Backpack"]').click();
        cy.url().should('include', '/inventory-item');
    });

  
    it('should display all four options when clicking on filter icon', () => {
      cy.get('.product_sort_container').find('option')
      .should('have.length', 4);
    });
  
    it('should list products in ascending alphabetic order when clicking on Name(A to Z)', () => {
      cy.get('.product_sort_container').select(0);
      cy.wait(2000); 
      cy.get(".inventory_item_name ").each(($product, index, $list) => {
        if (index > 0) {
          const previousProduct = $list.eq(index - 1).text();
          const currentProduct = $product.text();
          expect(previousProduct <= currentProduct).to.be.true;
        }
      });
      });
  
    it('should list products in descending alphabetic order when clicking on Name(Z to A)', () => {
      cy.get('.product_sort_container').select(1);
      cy.wait(2000); 
      cy.get(".inventory_item_name").each(($product, index, $list) => {
        if (index > 0) {
          const previousProduct = $list.eq(index - 1).text();
          const currentProduct = $product.text();
          expect(previousProduct >= currentProduct).to.be.true;
        }
      });
    });
  
    it('should list products from low price to high when clicking on Price(low to high)', () => {
      cy.get('.product_sort_container').select(2);
      cy.wait(4000); 
      cy.get("div.inventory_item_price").then(($prices) => {
        const prices = Cypress._.chain($prices.body).map((id) => parseFloat(id)).take(3)
        .value();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sortedPrices);
      });
    });
  
    it('should list products from high price to low when clicking on Price(high to low)', () => {
      cy.get('.product_sort_container').select(3);
      cy.wait(4000); 
      cy.get("div.inventory_item_price").then(($prices) => {
        const prices = Cypress._.chain($prices.body).map((id) => parseFloat(id)).take(3)
        .value();
        for (let i = 0; i < prices.length - 1; i++) {
          const currentPrice = parseFloat(prices[i].replace('$', ''));
          const nextPrice = parseFloat(prices[i + 1].replace('$', ''));
          expect(currentPrice).to.be.at.least(nextPrice);
        }
      });
    });
  
    it('should display hamburger icon and close icon when clicking on Hamburger icon', () => {
      cy.get('#react-burger-menu-btn').click();
      cy.get('#react-burger-cross-btn').click();
    });
  
  
  
   /* it('should navigate to saucelab official webpage when clicking on "About"', () => {
      cy.get('#react-burger-menu-btn').click();
      cy.get('[href="https://saucelabs.com/"]').should('be.visible').click();
      cy.get('[href="https://saucelabs.com/"]').should('be.visible').click({force:true});
      cy.wait(6000);
      cy.window().then((win) => {
        const newWindowUrl = win.location.href;
        expect(newWindowUrl).to.include('saucelabs.com');
      });
    }); */
  
    it('should logout the user from the session when clicking on "Logout"', () => {
      cy.get('#react-burger-menu-btn').click();
      cy.get('#logout_sidebar_link').click();
      cy.url().should('include', 'saucedemo.com');
    });
  
    it('should display "Remove" icon in red color when clicking on "Add to cart"', () => {
      cy.wait(2000);
      cy.get('#add-to-cart-sauce-labs-backpack').click();
      cy.wait(6000);
      cy.get('#remove-sauce-labs-backpack').should('be.visible');
      cy.wait(2000);
      cy.get('#add-to-cart-sauce-labs-bike-light').click();
    });
  
    it('should change the cart count to 1 in red color when clicking on "Add to cart"', () => {
      cy.get('.shopping_cart_badge').should('have.text', '2');
      //cy.xpath('//button[@id="add-to-cart-sauce-labs-backpack"]/..').click();
      cy.get('#remove-sauce-labs-backpack').click();
      // Verify that the cart count has changed to 1
      cy.wait(6000);
      cy.get('.shopping_cart_badge').should('have.text', '1');
    });
  
    it('should increase the number in cart when clicking "Add to cart" for different products', () => {
      cy.get('#add-to-cart-sauce-labs-onesie').click();
      cy.get('.shopping_cart_badge').should('have.text', '2');
      cy.wait(3000);
      cy.get('#remove-sauce-labs-onesie').click();
      cy.get('.shopping_cart_badge').should('have.text', '1');
    });

    beforeEach(function() {
      Swaglabslogin.loggin();
    })


  });
