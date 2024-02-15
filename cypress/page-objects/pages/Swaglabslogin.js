import BasePage from "../../page-objects/BasePage";


export default class Swaglabslogin{
    b = new BasePage();
    static pwd = 'input[id="password"]';
    static uname = "#user-name";
    static pause(ms) {
      cy.wait(ms)
    }
    static load(){
        cy.visit('https://www.saucedemo.com/')
    }
    static logInfo(message) {
      cy.log(message);
    }

    static goBack(){
      cy.go('back');
    }
  
    static checkexist(fields){
        cy.get(fields).should('exist');
    }
    static login_with_uname(name){
        cy.get(this.uname).type(name);
    }
    static login_with_pwd(names){
        cy.get(this.pwd).type(names);
        this.pause(2000);
    }
    static clicklogin(){
        cy.get('input[id="login-button"]').click();
    }
    static logout(){
        this.pause(2000);
        cy.get("#react-burger-menu-btn").click();
        this.pause(2000);
        cy.get('#logout_sidebar_link').click();
    }
    static loggin(){
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('.btn_action').click(); 
        return;
    }

}
  