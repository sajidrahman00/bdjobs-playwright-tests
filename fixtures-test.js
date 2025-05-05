// tests/using-fixtures.spec.js
const { test, expect } = require('./fixtures');
const { JobSearchPage, SearchResultsPage } = require('../pages/BdjobsPages');

test.describe('Using Custom Fixtures', () => {
  test('should search for jobs using logged in fixture', async ({ loggedInPage }) => {
    // Using the already logged in page
    const jobSearchPage = new JobSearchPage(loggedInPage);
    const searchResultsPage = new SearchResultsPage(loggedInPage);
    
    // Search for a job
    await jobSearchPage.searchJob('Web Developer');
    
    // Verify search results page is displayed
    await expect(loggedInPage).toHaveURL(/.*jobs/);
    
    // Click on first job in results
    await searchResultsPage.clickFirstJob();
    
    // Verify job details page is displayed
    await expect(loggedInPage).toHaveURL(/.*job-details/);
  });

  test('should use page objects from fixture', async ({ page, pageObjects }) => {
    // Using the pre-initialized page objects
    await pageObjects.homePage.navigateTo();
    await pageObjects.homePage.clickLogin();
    
    // Login with test credentials
    await pageObjects.loginPage.login('testuser@example.com', 'password123');
    
    // Verify successful login
    await expect(page.locator('text=My Account')).toBeVisible();
  });
});
