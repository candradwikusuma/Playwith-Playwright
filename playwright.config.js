
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 60 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',

  use: {
    browserName: "chromium",
    headless: false
    // screenshot: 'on',
    // trace: 'off'
  },



});

