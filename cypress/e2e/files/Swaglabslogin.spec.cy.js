/// <reference types="cypress" />
import { type } from "os";
import Swaglabslogin from "../../page-objects/pages/Swaglabslogin";
describe('Login Page', () => {
    it('should load the login page', () => {
        Swaglabslogin.load();
          })


      it('should have input fields for username and password', () => {
        Swaglabslogin.checkexist("#user-name");
        Swaglabslogin.checkexist('input[id="password"]');
      })
    
      it('should have a submit button', () => {
        Swaglabslogin.checkexist('input[id="login-button"]');
      })

      it('user login with valid username and password', () => {
        Swaglabslogin.load();
        Swaglabslogin.login_with_uname('standard_user');
        Swaglabslogin.login_with_pwd('secret_sauce');
      })

      it('user able to login', () => {
        Swaglabslogin.clicklogin();
      })

      it('user has to click logout', () => {
        Swaglabslogin.logout();
      })

      // Verify user able to login on giving invalid username and valid password
      it('user able to login', () => {
        Swaglabslogin.load();
        Swaglabslogin.login_with_uname('standard');
        Swaglabslogin.login_with_pwd('secret_sauce');
        Swaglabslogin.clicklogin();
      })

       // Verify user able to login on giving valid username and invalid password
       it('user able to login', () => {
        Swaglabslogin.load();
        Swaglabslogin.login_with_uname('standard_user');
        Swaglabslogin.login_with_pwd('secret');
        Swaglabslogin.clicklogin();
      })

      // Verify user able to login on giving invalid username and invalid password
      it('user able to login', () => {
        Swaglabslogin.load();
        Swaglabslogin.login_with_uname('madhumita');
        Swaglabslogin.login_with_pwd('3279999');
        Swaglabslogin.clicklogin();
      })

        // Verify user able to login on giving blank username and valid password
        it('user able to login', () => {
          Swaglabslogin.load();
          //Swaglabslogin.login_with_uname();
          Swaglabslogin.login_with_pwd('secret_sauce');
          Swaglabslogin.clicklogin();
        })

        // Verify user able to login on giving valid username and blank password
        it('user able to login', () => {
          Swaglabslogin.load();
          Swaglabslogin.login_with_uname('standard_user');
          //Swaglabslogin.login_with_pwd();
          Swaglabslogin.clicklogin();
        })

        // Verify user able to login on giving blank username and password
        it('user able to login', () => {
          Swaglabslogin.load();
          //Swaglabslogin.login_with_uname();
          //Swaglabslogin.login_with_pwd();
          Swaglabslogin.clicklogin();
        })

  


    })

      
    