// @ts-check
//import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
// config which holds all the informations

const config =({
  testDir: './tests',
  reporter: [
    ['html'],
    ['allure-playwright']
  ],
  timeout: 30 * 1000, // Maximum duration for each test
  expect: {
    timeout: 5000 // timeout for assertions
  },
  use: {
    baseURL: 'https://qaplayground.com',
    browserName: 'chromium',
    headless: true,
    launchOptions: {
        slowMo: 1000
    },
    outputDir: 'test-logs',
    fullyParallel: false,
    workers: 1,
    // Capture debugging information
    screenshot: 'on',
    trace: 'on-first-retry'
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  
  }
});
module.exports = config

