//const {test, expect} = require('@playwright/test');
const {test} = require('../utils/commonFixtures');
const user = require('../test-data/user.json');
const {LoginPage} = require('../pages/LoginPage');
const {DashboardPage} = require('../pages/DashboardPage');
const CommonUtils = require('../utils/commonUtils');


// username and password calling from json 
const uname = user.username;
const pswd = user.password;

if (!uname || !pswd) {
    throw new Error("Please provide LOGIN_USERNAME and LOGIN_PASSWORD.");
}


// Test Case 1: Verify the login page
test('Verify login page', async ({page}) => {
    
    CommonUtils.CommonUtils.logMessage("Verifying Login Page Test");
    const loginPage=new LoginPage(page);
    await loginPage.openLoginPage();
    CommonUtils.CommonUtils.logMessage('Login page opened');
    await loginPage.verifyLoginPage();
    CommonUtils.CommonUtils.logMessage('Verified LoginPage');
      
});

// Test case: 2  Verify Invalid login
test('Verify with Invalid Credentials', async ({page})=> {
    
    CommonUtils.CommonUtils.logMessage("Verifying Invalid Login Test");
    
    const loginPage=new LoginPage(page);
    await loginPage.openLoginPage();

    console.log("Navigated to ", await page.title());

    await loginPage.login(uname, "bank");
    CommonUtils.CommonUtils.logMessage('Submitted Invalid credentials');
    await loginPage.verifyLoginError();
    CommonUtils.CommonUtils.logMessage('Verified error message');
    CommonUtils.CommonUtils.logMessage('Invalid login test completed');
    
});

// Test case: 3  Verify successful login
test('Verify with valid credentials', async ({page})=>{
    
    CommonUtils.CommonUtils.logMessage("Verifying Valid Login Test");
    
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.openLoginPage();

    console.log("Navigated to ", await page.title());

    await loginPage.login(uname, pswd);
    CommonUtils.CommonUtils.logMessage('Submitted valid credentials');

    console.log(await dashboardPage.verifyWelcomeMessage());
    CommonUtils.CommonUtils.logMessage('Welcome message verified');
    await CommonUtils.CommonUtils.takeScreenshot(page, 'login-success.png');

    CommonUtils.CommonUtils.logMessage('Valid login test completed');

});
