/// <reference types="cypress" />

import { type } from "os";

//Testsuite
describe("Leaftaps automation", ()=>{
    //Testcase
    it("Log into testleaf", ()=>{

        cy.visit("http://leaftaps.com/opentaps/control/main");

        cy.get("#username").type("DemoSalesManager");
        cy.get("#password").type("crmsfa");
        cy.get(".decorativeSubmit").click();









    })





})