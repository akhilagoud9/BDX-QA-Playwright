// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */


// config which holds all the informations

const config =({
  testDir: './tests',
  timeout: 30 * 1000, // to overwrite the default timeout for each step

  expect: {
    timeout: 5000 // timeout for assertions
  },

  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    launchOptions: {
        slowMo: 1000
    }
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  
    }
});
module.exports = config

