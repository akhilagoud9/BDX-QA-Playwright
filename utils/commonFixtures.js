const base = require('@playwright/test');
const { CommonUtils } = require('./commonUtils');
const fs = require('fs');
const path = require('path');

const test = base.test;

test.afterEach(async ({}, testInfo) => {
    const status = testInfo.status === 'passed' ? 'PASS' : 'FAIL';

    CommonUtils.logMessage(`${status}: ${testInfo.title}`);

    // Attach execution log to Allure
    const logFile = path.join(
        CommonUtils.runDir,
        'execution.log'
    );

    if (fs.existsSync(logFile)) {
        await testInfo.attach('Execution Log', {
            body: fs.readFileSync(logFile),
            contentType: 'text/plain'
        });
    } else {
        console.log('Log file not found:', logFile);
    }

    console.log('\n');
});

module.exports = {
    test,
    expect: base.expect
};
