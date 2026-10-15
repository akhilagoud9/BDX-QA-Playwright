//const {test} = require('@playwright/test');
const user = require('../test-data/user.json');
const {LoginPage} = require('../pages/LoginPage');
const {DashboardPage} = require('../pages/DashboardPage');
const {FundTransferPage} = require('../pages/FundTransferPage');
const CommonUtils = require('../utils/commonUtils');
const { test, expect} = require('../utils/commonFixtures');

//const context = await browser.newContext(); // creates instance of browser
//const page = await context.newPage();  // it creates actual page to automate; hits URL and automate

// username and password calling from json 
const uname = user.username;
const pswd = user.password;

if (!uname || !pswd) {
    throw new Error("Please provide LOGIN_USERNAME and LOGIN_PASSWORD.");
}

// Test case: 5 Transfer Money
test('Transfer Money', async ({ page }) => {
    CommonUtils.CommonUtils.logMessage('Verifying Transfer Money');
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const transferPage = new FundTransferPage(page);

    // Login
    await loginPage.openLoginPage();
    await loginPage.login(uname, pswd);

    // Navigate to Transfer page
    await dashboardPage.openTransferPage();

    // Verify Transfer page
    await transferPage.verifyTransferPage();

    // Enter transfer details
    await transferPage.enterTransferInfo(
        user.transfer.fromAccount,
        user.transfer.toAccount,
        user.transfer.amount,
        user.transfer.description,
        user.transfer.transferType
    );
    await CommonUtils.CommonUtils.takeScreenshot(page, 'review-transfer.png');
    CommonUtils.CommonUtils.logMessage('Entered transfer details successfully');
    await transferPage.verifyAndConfirmTransfer();
    await CommonUtils.CommonUtils.takeScreenshot(page, 'confirm-transfer-success.png');
    CommonUtils.CommonUtils.logMessage('Transfered money successfully');
});
