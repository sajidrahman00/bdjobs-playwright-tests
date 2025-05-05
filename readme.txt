# BDJobs Playwright Test Automation

This project contains automated tests for the BDJobs website using Playwright test framework.

## Project Structure

```
bdjobs-playwright-tests/
├── fixtures/              # Test fixtures like images, PDFs
├── pages/                 # Page Object Models
├── tests/                 # Test files
├── utils/                 # Helper functions
├── .env.example           # Environment variables template
├── package.json           # Project dependencies
├── playwright.config.js   # Playwright configuration
└── README.md              # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd bdjobs-playwright-tests
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Then edit the `.env` file with your test credentials.

4. Add test fixtures:
   Place required test files in the `fixtures` directory:
   - A sample CV file named `test-cv.pdf`
   - A sample profile photo named `profile-photo.jpg`

## Running Tests

Run all tests:
```
npm test
```

Run tests in a specific browser:
```
npm run test:chrome
npm run test:firefox
npm run test:safari
```

Run tests with UI mode (for debugging):
```
npm run test:ui
```

View test report:
```
npm run report
```

## Adding New Tests

1. Create a new test file in the `tests` directory
2. Import required page objects from `pages/BdjobsPages.js`
3. Write your test using the Playwright test framework

Example:
```javascript
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/BdjobsPages');

test('example test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateTo();
  // Add your test steps here
});
```

## Page Objects

The project uses Page Object Model (POM) pattern to improve test maintainability. All page objects are defined in `pages/BdjobsPages.js`.

## Troubleshooting

- If tests fail due to timeouts, try increasing the timeout in `playwright.config.js`
- For element not found errors, check if the selectors in page objects match the current website structure
- For authentication issues, verify your test credentials in the `.env` file
