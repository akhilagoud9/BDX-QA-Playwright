
const { execSync } = require('child_process');

const testType = process.argv[2];

let command;

switch (testType) {
    case 'login':
        command = 'npx playwright test tests/login.spec.js';
        break;

    case 'dashboard':
        command = 'npx playwright test tests/dashboard.spec.js';
        break;

    case 'transfer':
        command = 'npx playwright test tests/fundTransfer.spec.js';
        break;

    case 'all':
        //command = 'npx playwright test tests/login.spec.js tests/dashboard.spec.js tests/fundTransfer.spec.js --workers=1';
        command = 'npx playwright test tests/login.spec.js --workers=1 && npx playwright test tests/dashboard.spec.js --workers=1 && npx playwright test tests/fundTransfer.spec.js --workers=1';
        break;

    default:
        console.log('Please specify a valid test type.');
        console.log('Usage: node cli/cli.js [login|dashboard|transfer|all]');
        process.exitCode = 1;
        return;
}

const runId = new Date()
    .toISOString()
    .replace(/[:.]/g, '-');

try {
    console.log('========== Playwright Test Execution Started ==========');
    console.log(`Running ${testType} tests...`);

    execSync(command, {
        stdio: 'inherit',
        cwd: process.cwd(),
        env: {
            ...process.env,
            TEST_RUN_ID: runId
        }
    });
    console.log('========== Playwright Test Execution Completed ==========');
} catch (error) {
    console.error('========== Playwright Test Execution Failed ==========');
    process.exitCode = 1;
}
