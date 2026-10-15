
const fs = require('fs');
const path = require('path');

class CommonUtils {
    static runDir = null;

    // Create one unique directory for each test run
    /*static createRunDirectory() {
        const timestamp = process.env.TEST_RUN_ID ||
            new Date().toISOString().replace(/[:.]/g, '-');

        this.runDir = path.join(
            process.cwd(),
            'test-logs',
            `run-${timestamp}`
        );

        fs.mkdirSync(this.runDir, { recursive: true });

        console.log(`Run directory: ${this.runDir}`);
    }*/
   static createRunDirectory() {
        const timestamp = process.env.TEST_RUN_ID ||
            new Date().toISOString().replace(/[:.]/g, '-');

        this.runDir = path.join(
            process.cwd(),
            'test-logs',
            `run-${timestamp}`
        );

        fs.mkdirSync(this.runDir, { recursive: true });

        console.log(`[DEBUG] TEST_RUN_ID: ${process.env.TEST_RUN_ID}`);
        console.log(`[DEBUG] Log directory: ${this.runDir}`);
        console.log(`[DEBUG] Log file: ${path.join(this.runDir, 'execution.log')}`);
    }

    static logMessage(message) {
        if (!this.runDir) {
            this.createRunDirectory();
        }

        const logFile = path.join(this.runDir, 'execution.log');
        const entry = `[${new Date().toISOString()}] ${message}`;

        console.log(entry);
        fs.appendFileSync(logFile, entry + '\n');
    }

    static async takeScreenshot(page, fileName) {
        if (!this.runDir) {
            this.createRunDirectory();
        }

        const filePath = path.join(this.runDir, fileName);

        await page.screenshot({
            path: filePath,
            fullPage: true
        });

        this.logMessage(`Screenshot saved: ${fileName}`);
    }
}

module.exports = { CommonUtils };
