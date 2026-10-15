
const { expect } = require('@playwright/test');

class FundTransferPage {

    constructor(page) {
        this.page = page;
        this.transferlink = this.page.getByTestId('sidebar-link-transfer');
        this.transferHeading = this.page.getByRole('heading', {
            name: 'Transfer Money',
            exact: true
        });

        this.transferSubtitle = this.page.getByText(
            'Move funds between your accounts',
            { exact: true }
        );

        this.fromAccount = this.page.getByText('Select account', { exact: true }).first();
        this.toAccount = this.page.getByText('Select account', { exact: true }).last();
        this.amount = this.page.getByLabel('Amount');
        this.memo = this.page.locator("[type='text']");
        this.todayOption = this.page.getByLabel('Today');
        this.scheduleOption = this.page.getByLabel('Schedule for later');
        this.selectDate = this.page.getByTestId('transfer-scheduled-date');
        this.reviewTransfer = this.page.getByRole('button', {
                name: 'Review Transfer'
        });
    }

    async verifyTransferPage() {
        await expect(this.transferHeading).toBeVisible();
        const heading = await this.transferHeading.innerText();
        await expect(this.transferSubtitle).toBeVisible();
        const subtitle = await this.transferSubtitle.innerText();
        console.log(heading,"\n",subtitle,"\nTransfer page displayed successfully...");

    }

    async enterTransferInfo(fromAccount, toAccount, amount, memo, transferType, scheduledDate=null){

        // Select from Account
        await this.fromAccount.click();
        await this.page.getByText(fromAccount, { exact: true }).click();

         // Select To Account
        await this.toAccount.click();
        await this.page.getByTestId('transfer-to-option').getByText(toAccount, { exact: true }).click();

        // Enter Amount and Memo
        await this.amount.fill(amount);

        //console.log('Memo enabled:', await this.memo.isEnabled());
        await this.memo.fill(memo);

        // Select transfer date option
        if (transferType === 'Today') {
            await this.todayOption.click();
        } else if (transferType === 'Schedule for later') {
            await this.scheduleOption.click();

            // Open the calendar
            await this.selectDate.click();

            // Select the required date
            await this.page.getByRole('button', {
                name: scheduledDate,
                exact: true
            }).click();
        }
        else {
            throw new Error('Invalid transfer type: ${transferType}');
        }

        // Review Transfer
        await this.reviewTransfer.click();

        console.log("Transfer details submitted for review.");

    }

    async verifyAndConfirmTransfer() {
        // Locate the confirmation popup
        const confirmation = this.page.getByText('Confirm Transfer', {exact: true}).first();
        await confirmation.waitFor({ state: 'visible' });

        // Read and print confirmation details
        const details = await this.page.locator('body').innerText();

        console.log('\n===== Transfer Confirmation Details =====');
        console.log(details);

        // Click Confirm Transfer
        await this.page.getByRole('button', {
            name: 'Confirm Transfer',
            exact: true
        }).click();

        console.log('Transfer confirmed successfully.');


        // Wait for successful transfer page
        await this.page.getByRole('heading', {
            name: 'Transfer Successful'
        }).waitFor({ state: 'visible' });

        // Capture the success page screenshot
        await this.page.screenshot({
            path: 'screenshots/transfer-success.png',
            fullPage: true
        });

        console.log('Transfer successful! Screenshot captured.');
    }
}   

module.exports = { FundTransferPage };
