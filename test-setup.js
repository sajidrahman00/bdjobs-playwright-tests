// tests/setup/global-setup.js
const { chromium } = require('@playwright/test');
const { testUsername, testPassword, baseUrl } = require('../../utils/env');

/**
 * Global setup to be run once before all tests
 */
async function globalSetup() {
  // Launch browser
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Login and create a storage state (cookies, localStorage) to be reused
  await page.goto(baseUrl);
  await page.click('#loginLink');

  // Fill login form
  await page.fill('#username', testUsername);
  await page.fill('#password', testPassword);
  await page.click('#loginButton');

  // Wait for login to complete
  await page.waitForSelector('text=My Account', { timeout: 10000 })
    .catch(() => console.log('Warning: Could not verify login success'));

  // Save storage state to be reused in tests requiring authentication
  await context.storageState({ path: './tests/setup/storageState.json' });
  
  // Close browser
  await browser.close();
}

module.exports = globalSetup;
