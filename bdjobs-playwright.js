const { chromium, firefox, webkit } = require('@playwright/test');

class BdjobsPages {
    /**
     * Initialize a browser based on the provided browser name
     * @param {string} browserName - The name of the browser to initialize (chrome, firefox, webkit)
     * @returns {Promise<Browser>} - The browser instance
     */
    static async initBrowser(browserName) {
        let browser;
        
        switch (browserName.toLowerCase()) {
            case 'chrome':
                browser = await chromium.launch();
                break;
            case 'firefox':
                browser = await firefox.launch();
                break;
            case 'webkit':
                browser = await webkit.launch();
                break;
            default:
                throw new Error(`Unsupported browser: ${browserName}`);
        }
        
        return browser;
    }
    
    /**
     * Create a new context and page
     * @param {Browser} browser - The browser instance
     * @returns {Promise<{context: BrowserContext, page: Page}>} - The browser context and page
     */
    static async createContextAndPage(browser) {
        const context = await browser.newContext();
        const page = await context.newPage();
        return { context, page };
    }
}

class HomePage {
    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.loginLink = '#loginLink';
    }
    
    /**
     * Click on the login link
     * @returns {Promise<void>}
     */
    async clickLogin() {
        await this.page.click(this.loginLink);
    }
}

class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.usernameField = '#username';
        this.passwordField = '#password';
        this.loginButton = '#loginButton';
    }
    
    /**
     * Enter username in the username field
     * @param {string} username - The username to enter
     * @returns {Promise<void>}
     */
    async enterUsername(username) {
        await this.page.fill(this.usernameField, username);
    }
    
    /**
     * Enter password in the password field
     * @param {string} password - The password to enter
     * @returns {Promise<void>}
     */
    async enterPassword(password) {
        await this.page.fill(this.passwordField, password);
    }
    
    /**
     * Click on the login button
     * @returns {Promise<void>}
     */
    async clickLogin() {
        await this.page.click(this.loginButton);
    }
    
    /**
     * Complete the login process with the provided credentials
     * @param {string} username - The username to use
     * @param {string} password - The password to use
     * @returns {Promise<void>}
     */
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}

class SearchResultsPage {
    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.firstJobLink = '.job-listing a';
    }
    
    /**
     * Click on the first job in the search results
     * @returns {Promise<void>}
     */
    async clickFirstJob() {
        await this.page.click(this.firstJobLink);
    }
}

class JobSearchPage {
    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.searchBox = '#txtKeyword';
        this.searchButton = '#btnSearch';
    }
    
    /**
     * Search for jobs with the provided keyword
     * @param {string} keyword - The keyword to search for
     * @returns {Promise<void>}
     */
    async searchJob(keyword) {
        await this.page.fill(this.searchBox, keyword);
        await this.page.click(this.searchButton);
    }
}

class CVSubmitPage {
    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.uploadCVButton = '#uploadCV';
        this.submitButton = '#submitCV';
    }
    
    /**
     * Upload a CV file
     * @param {string} filePath - The path to the CV file
     * @returns {Promise<void>}
     */
    async uploadCV(filePath) {
        await this.page.setInputFiles(this.uploadCVButton, filePath);
    }
    
    /**
     * Click on the submit button
     * @returns {Promise<void>}
     */
    async clickSubmit() {
        await this.page.click(this.submitButton);
    }
}

class NotificationPage {
    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.notificationBell = '#notificationBell';
    }
    
    /**
     * Open notifications by clicking on the notification bell
     * @returns {Promise<void>}
     */
    async openNotifications() {
        await this.page.click(this.notificationBell);
    }
}

class ProfilePage {
    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.editProfileButton = '#btnEditProfile';
        this.fullNameField = '#txtFullName';
        this.uploadPhotoButton = '#btnUploadPhoto';
        this.saveButton = '#btnSave';
    }
    
    /**
     * Click on the edit profile button
     * @returns {Promise<void>}
     */
    async clickEditProfile() {
        await this.page.click(this.editProfileButton);
    }
    
    /**
     * Update the full name in the profile
     * @param {string} fullName - The full name to update
     * @returns {Promise<void>}
     */
    async updateFullName(fullName) {
        await this.page.fill(this.fullNameField, fullName);
    }
    
    /**
     * Upload a profile photo
     * @param {string} filePath - The path to the photo file
     * @returns {Promise<void>}
     */
    async uploadPhoto(filePath) {
        await this.page.setInputFiles(this.uploadPhotoButton, filePath);
    }
    
    /**
     * Click on the save button
     * @returns {Promise<void>}
     */
    async clickSave() {
        await this.page.click(this.saveButton);
    }
}

class InboxPage {
    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.inboxLink = '#inboxLink';
    }
    
    /**
     * Open the inbox
     * @returns {Promise<void>}
     */
    async openInbox() {
        await this.page.click(this.inboxLink);
    }
}

class LogoutPage {
    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.logoutButton = '#btnLogout';
    }
    
    /**
     * Click on the logout button
     * @returns {Promise<void>}
     */
    async clickLogout() {
        await this.page.click(this.logoutButton);
    }
}

class ApplicationHistoryPage {
    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.applicationHistoryTab = '#applicationHistoryTab';
    }
    
    /**
     * Open the application history
     * @returns {Promise<void>}
     */
    async openApplicationHistory() {
        await this.page.click(this.applicationHistoryTab);
    }
}

module.exports = {
    BdjobsPages,
    HomePage,
    LoginPage,
    SearchResultsPage,
    JobSearchPage,
    CVSubmitPage,
    NotificationPage,
    ProfilePage,
    InboxPage,
    LogoutPage,
    ApplicationHistoryPage
};
