
const { expect } = require('@playwright/test');

class LoginPage {

    constructor(page) {
        this.page = page;
        //this.URL = "https://qaplayground.com/bank/login";
        this.userName = '#login-username';
        this.passwd = '#login-password';
        this.signIn = "[type='submit']";
        this.loginError = "[data-testid='login-error-message']";
    }

    // Navigate to login page
    async openLoginPage() {
        await this.page.goto('/bank/login');
    }

    // Verify login page
    async verifyLoginPage() {
        await expect(this.page).toHaveTitle(
            "QA Playground - Master Automation Testing"
        );

        console.log(await this.page.title());

        await expect(this.page.locator(this.userName)).toBeVisible();
        await expect(this.page.locator(this.passwd)).toBeVisible();
        await expect(this.page.locator(this.signIn)).toBeVisible();

        console.log("Validated the Login page...");
    }

    // Enter credentials and click Sign In
    async login(uname, pswd) {
        await this.page.locator(this.userName).fill(uname);
        await this.page.locator(this.passwd).fill(pswd);
        await this.page.locator(this.signIn).click();
    }

    // Verify invalid login
    async verifyLoginError() {
        console.log(await this.page.locator(this.loginError).textContent());
        await expect(this.page.locator(this.loginError)).toContainText('incorrect');
        console.log("Please provide valid credentials...");
    }
}

module.exports = { LoginPage };
