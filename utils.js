// utils/helpers.js

/**
 * Generates a random email for test purposes
 * @returns {string} Random email address
 */
function generateRandomEmail() {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `test_${randomString}@example.com`;
}

/**
 * Pauses execution for a specified amount of time
 * @param {number} ms Time to wait in milliseconds
 * @returns {Promise} Promise that resolves after the specified time
 */
function waitFor(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Formats date in YYYY-MM-DD format
 * @param {Date} date Date object
 * @returns {string} Formatted date string
 */
function formatDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generates test data for form fields
 * @returns {Object} Object containing test data
 */
function generateTestData() {
  return {
    firstName: 'Test',
    lastName: `User_${Math.floor(Math.random() * 1000)}`,
    phone: `+8801${Math.floor(Math.random() * 1000000000)}`,
    address: '123 Test Street, Dhaka',
    experience: Math.floor(Math.random() * 10) + ' years'
  };
}

module.exports = {
  generateRandomEmail,
  waitFor,
  formatDate,
  generateTestData
};
