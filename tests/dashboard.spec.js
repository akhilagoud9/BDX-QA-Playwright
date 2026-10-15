//const {test, expect} = require('@playwright/test');
const user = require('../test-data/user.json');
const {LoginPage} = require('../pages/LoginPage');
const {DashboardPage} = require('../pages/DashboardPage');
const {FundTransferPage} = require('../pages/FundTransferPage');
const CommonUtils = require('../utils/commonUtils');
const {test} = require('../utils/commonFixtures');

// username and password calling from json 
const uname = user.username;
const pswd = user.password;

if (!uname || !pswd) {
    throw new Error("Please provide LOGIN_USERNAME and LOGIN_PASSWORD.");
}

// Display operations and navigate to Transfer page
test('Display operations and navigate to Transfer page', async ({ page }) => {
       
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const transferPage = new FundTransferPage(page);

    // Login first
    await loginPage.openLoginPage();
    await loginPage.login(uname, pswd);

    // Verify dashboard and display operations
    await dashboardPage.verifyWelcomeMessage();
    //await dashboardPage.displayOperations();

    // Navigate to Transfer page
    await dashboardPage.openTransferPage();

    // Verify Transfer page
    await transferPage.verifyTransferPage();
    CommonUtils.CommonUtils.logMessage('Navigated to transfer page successfully');
    await CommonUtils.CommonUtils.takeScreenshot(page, 'transfer-page.png');

});
