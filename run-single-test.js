#!/usr/bin/env node
// scripts/run-test.js
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get test file from command line arguments
const testFile = process.argv[2];
const browser = process.argv[3] || 'chromium';

if (!testFile) {
  console.error('Please specify a test file to run.');
  console.log('Usage: node scripts/run-test.js <test-file> [browser]');
  console.log('Example: node scripts/run-test.js login.spec.js chrome');
  process.exit(1);
}

// Normalize test file path
const testDir = path.join(__dirname, '../tests');
let testPath = testFile;

if (!path.isAbsolute(testFile)) {
  testPath = path.join(testDir, testFile);
}

// Check if the test file exists
if (!fs.existsSync(testPath)) {
  // Try adding .spec.js extension if not provided
  if (!testFile.endsWith('.spec.js')) {
    testPath = path.join(testDir, `${testFile}.spec.js`);
  }
  
  if (!fs.existsSync(testPath)) {
    console.error(`Test file not found: ${testFile}`);
    process.exit(1);
  }
}

// Run the test
try {
  console.log(`Running test: ${testPath} in ${browser}`);
  execSync(`npx playwright test ${testPath} --project=${browser}`, { 
    stdio: 'inherit' 
  });
} catch (error) {
  console.error('Test execution failed.');
  process.exit(1);
}
