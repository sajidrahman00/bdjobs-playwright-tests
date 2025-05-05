// utils/reportUtils.js
const fs = require('fs');
const path = require('path');

/**
 * Creates a timestamp-based folder name for test results
 * @returns {string} Folder name with timestamp
 */
function getTimestampFolderName() {
  const now = new Date();
  return `test-run-${now.toISOString().replace(/[:.]/g, '-')}`;
}

/**
 * Ensures the report directory exists
 * @param {string} dir Directory path
 */
function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Creates a custom HTML test summary
 * @param {Object} results Test results object
 * @param {string} outputPath Path to save the report
 */
function createCustomReport(results, outputPath) {
  const reportDir = path.join(process.cwd(), 'custom-reports', getTimestampFolderName());
  ensureDirectoryExists(reportDir);
  
  const reportPath = path.join(reportDir, 'summary.html');
  
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>BDJobs Test Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #0066cc; }
        .summary { margin-bottom: 20px; }
        .passed { color: green; }
        .failed { color: red; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        tr:nth-child(even) { background-color: #f9f9f9; }
      </style>
    </head>
    <body>
      <h1>BDJobs Playwright Test Report</h1>
      <div class="summary">
        <p>Run date: ${new Date().toLocaleString()}</p>
        <p>Total tests: ${results.total}</p>
        <p class="passed">Passed: ${results.passed}</p>
        <p class="failed">Failed: ${results.failed}</p>
      </div>
      <h2>Test Results</h2>
      <table>
        <tr>
          <th>Test</th>
          <th>Status</th>
          <th>Duration</th>
        </tr>
  `;
  
  results.tests.forEach(test => {
    html += `
      <tr>
        <td>${test.name}</td>
        <td class="${test.status === 'passed' ? 'passed' : 'failed'}">${test.status}</td>
        <td>${test.duration}ms</td>
      </tr>
    `;
  });
  
  html += `
      </table>
    </body>
    </html>
  `;
  
  fs.writeFileSync(reportPath, html);
  console.log(`Custom report saved to: ${reportPath}`);
}

module.exports = {
  getTimestampFolderName,
  ensureDirectoryExists,
  createCustomReport
};
