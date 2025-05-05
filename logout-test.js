// tests/logout.spec.js
const { test, expect } = require('@playwright/test');
const { HomePage, LoginPage, LogoutPage } = require('../pages/BdjobsPages');

test.describe('Logout Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    
    // Navigate to homepage
    await homePage.navigateTo();
    
    // Login
    await homePage.clickLogin();
    await loginPage.login('testuser@example.com', 'password123');
    
    // Verify successful login
    await expect(page.locator('text=My Account')).toBeVisible();
  });

  test('should successfully logout', async ({ page }) => {
    // Initialize LogoutPage
    const logoutPage = new LogoutPage(page);
    
    // Click logout
    await logoutPage.clickLogout();
    
    // Verify successful logout
    await expect(page).toHaveURL(/.*home/); // or whatever the homepage URL pattern is
    await expect(page.locator('#loginLink')).toBeVisible();
  });
});
