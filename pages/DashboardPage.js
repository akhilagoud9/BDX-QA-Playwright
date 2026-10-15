
const { expect } = require('@playwright/test');

class DashboardPage {

    constructor(page) {
        this.page = page;
        this.welcomeMessage = "[data-testid='dashboard-welcome-message']";
        this.transferLink = this.page.getByTestId('sidebar-link-transfer');
    }

    // Verify dashboard welcome message
    async verifyWelcomeMessage() {
        const message = await this.page.locator(this.welcomeMessage).innerText();
        await expect(this.page.locator(this.welcomeMessage)).toContainText(/Welcome /);

        console.log("Logged in Successfully...");
        return message;
    }

    // Display dashboard operations
    async displayOperations() {
        const dashboardText = await this.page.getByTestId('bank-sidebar').innerText();
        console.log("\nDashboard operations:\n");
        console.log(dashboardText);
    }

    // Navigate to Transfer page
    async openTransferPage() {
        await this.transferLink.click();
        //const heading = await this.transferLink.innerText();
        console.log("\nNavigated to Transfer page");
        console.log("Current URL:", this.page.url());
       // return heading;

    }
}

module.exports = { DashboardPage };
