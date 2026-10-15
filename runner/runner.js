const { execSync } = require('child_process');
const packageInfo = require('../package.json');

console.log(`Framework Version: ${packageInfo.version}`);

function runTests() {
    const testFiles = [
        'tests/login.spec.js',
        'tests/dashboard.spec.js',
        'tests/fundTransfer.spec.js'
    ];
    const runId = new Date()
        .toISOString()
        .replace(/[:.]/g, '-');

    let hasFailures = false;

    try {
        console.log('========== Playwright Test Execution Started ==========');
        /*execSync('npx playwright test tests/login.spec.js --workers=1 && npx playwright test tests/dashboard.spec.js --workers=1 && npx playwright test tests/fundTransfer.spec.js --workers=1', {
                stdio: 'inherit',
                cwd: process.cwd(),
                env: {
                ...process.env,
                TEST_RUN_ID: runId
            }
            });*/
        
        for (const file of testFiles) {
            console.log(`\n========== Running: ${file} ==========`);
            try {
                execSync(`npx playwright test ${file} --workers=1`, {
                    stdio: 'inherit',
                    cwd: process.cwd(),
                    env: {
                        ...process.env,
                        TEST_RUN_ID: runId
                    }
                });
            } catch (error) {
                hasFailures=true;
                console.error(`Test execution failed: ${file}`);
            }
        }
        console.log('========== Playwright Test Execution Completed ==========');
    } finally {
        try {
            console.log('\n========== Generating Allure Report ==========');

            execSync(
                'npx allure generate allure-results --clean -o allure-report',
                {
                    stdio: 'inherit',
                    cwd: process.cwd()
                }
            );
        } catch (error) {
            hasFailures = true;
            console.error('Allure report generation or opening failed.');
        }
    }

    if (hasFailures) {
        process.exitCode = 1;
    }
}

runTests();