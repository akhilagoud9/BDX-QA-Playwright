//import test annotation

const {test, expect} = require('@playwright/test');


test('Browser Context Playwright test', async ({browser})=>
{
    const context = await browser.newContext(); // creates instance of browser
    const page = await context.newPage();  // it creates actual page to automate; hits URL and automate
    await page.goto("https://qaplayground.com/bank/login");

    const userName=page.locator('#login-username');
    const passwd=page.locator('#login-password');
    const signIn=page.locator("[type='submit']");
    
    console.log(await page.title());
    //await expect(page).toHaveTitle("QA Playground - Master Automation Testing");

    //css, xpath
    // Login Page
    await userName.fill("standard_use");
    await passwd.fill("bank_sauce");
    await signIn.click();

    console.log(await page.locator("[data-testid='login-error-message']").textContent());
    await expect(page.locator("[data-testid='login-error-message']")).toContainText('incorrect');

    await userName.fill("");
    await userName.fill("standard_user");
    await signIn.click();

    
    //close the browser 
    await browser.close();

});




















// another way to automate with few lines of code
/*
test('First PlayWright Test', async ({page})=>
{
    await page.goto("https://qaplayground.com/bank/dashboard");

});
*/

// to run only specific by excluding all other tests.
// another way to automate with few lines of code
/*test.only('First PlayWright Test', async ({page})=>
{
    await page.goto("https://qaplayground.com/bank/login");
    //await page.goto("https://qaplayground.com/bank/dashboard");
    console.log(await page.title());

    await expect(page).toHaveTitle("QA Playground - Master Automation Testing");
});
*/