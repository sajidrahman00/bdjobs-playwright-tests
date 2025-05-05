// tests/notifications.spec.js
const { test, expect } = require('@playwright/test');
const { HomePage, LoginPage, NotificationPage } = require('../pages/BdjobsPages');

test.describe('Notifications', () => {
  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    
    // Navigate to homepage
    await homePage.navigateTo();
    
    // Login
    await homePage.clickLogin();
    await loginPage.login('testuser@example.com', 'password123');
  });

  test('should display notifications when clicked', async ({ page }) => {
    // Initialize NotificationPage
    const notificationPage = new NotificationPage(page);
    
    // Open notifications
    await notificationPage.openNotifications();
    
    // Verify notifications panel is visible
    await expect(page.locator('.notification-panel')).toBeVisible();
  });

  test('should mark notification as read when clicked', async ({ page }) => {
    // Initialize NotificationPage
    const notificationPage = new NotificationPage(page);
    
    // Open notifications
    await notificationPage.openNotifications();
    
    // Click on first notification
    await page.click('.notification-item:first-child');
    
    // Verify notification is marked as read
    await expect(page.locator('.notification-item:first-child.read')).toBeVisible();
  });
});
