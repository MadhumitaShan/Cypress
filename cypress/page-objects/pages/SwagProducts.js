import BasePage from "../../page-objects/BasePage";


export default class SwagProducts{

static getTitle(title){
const productTitleLocator = title;
const productTitleElement = cy.get(productTitleLocator);
const productTitle = productTitleElement.text();
return productTitle;
}
static checkexistwithparent(fields, names){
    cy.get(fields).parent(names).should('exist');
}
static checkout(){
    cy.get('.shopping_cart_link').click();
    cy.get('#checkout').click();
    return 
}
static locator(locator){
    cy.xpath(locator).each(($element, index) => {
    cy.wrap($element).invoke('text').then((text) => {
      const number = parseInt(text);
      console.log(number);
      return number;
    });
  });}


static clickOnProduct(name){
    cy.xpath("//div[text()='"+name+"']/../parent::*").click()
}

}