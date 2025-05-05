// @ts-check
const { test, expect } = require('@playwright/test');
const { 
    BdjobsPages, 
    HomePage, 
    LoginPage, 
    JobSearchPage, 
    SearchResultsPage,
    ProfilePage
} = require('./BdjobsPages');

test.describe('Bdjobs Portal Tests', () => {
    let browser;
    let page;
    let context;

    test.beforeAll(async () => {
        // Initialize browser
        browser = await BdjobsPages.initBrowser('chrome');
    });

    test.beforeEach(async () => {
        // Create a new context and page for each test
        const result = await BdjobsPages.createContextAndPage(browser);
        context = result.context;
        page = result.page;
        
        // Navigate to the website
        await page.goto('https://www.bdjobs.com');
    });

    test.afterEach(async () => {
        // Close the context after each test
        await context.close();
    });

    test.afterAll(async () => {
        // Close the browser after all tests
        await browser.close();
    });

    test('Should be able to login', async () => {
        // Arrange
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        
        // Act
        await homePage.clickLogin();
        await loginPage.login('testuser@example.com', 'password123');
        
        // Assert - this is a placeholder, add your actual assertion
        await expect(page).toHaveURL(/dashboard/);
    });

    test('Should be able to search for jobs', async () => {
        // Arrange
        const jobSearchPage = new JobSearchPage(page);
        const searchResultsPage = new SearchResultsPage(page);
        
        // Navigate to job search page (this is a placeholder, adjust as needed)
        await page.goto('https://www.bdjobs.com/jobsearch');
        
        // Act
        await jobSearchPage.searchJob('Software Engineer');
        
        // Assert - this is a placeholder, add your actual assertion
        await expect(page.locator('.job-listing')).toBeVisible();
        
        // Click on first job
        await searchResultsPage.clickFirstJob();
        
        // Assert - verify that job details page is shown
        await expect(page).toHaveURL(/jobdetails/);
    });

    test('Should be able to update profile', async () => {
        // Arrange
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const profilePage = new ProfilePage(page);
        
        // Login first
        await homePage.clickLogin();
        await loginPage.login('testuser@example.com', 'password123');
        
        // Navigate to profile page (this is a placeholder, adjust as needed)
        await page.goto('https://www.bdjobs.com/profile');
        
        // Act
        await profilePage.clickEditProfile();
        await profilePage.updateFullName('John Doe Updated');
        await profilePage.clickSave();
        
        // Assert - this is a placeholder, add your actual assertion
        await expect(page.locator('.success-message')).toBeVisible();
    });
});
