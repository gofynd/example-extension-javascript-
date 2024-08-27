module.exports = {
    verbose: true,
    coverageReporters: ["json-summary", "lcov", "cobertura"],
    testMatch: ['**/test/**/*.spec.js'],
    transform: {
      "^.+\\.js$": "babel-jest",
      "^.+\\.vue$": "@vue/vue3-jest",
      ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|gif|svg)$": "jest-transform-stub",
    },
    testEnvironment: "jsdom", // Simulate a browser environment for testing
    testEnvironmentOptions: {
      customExportConditions: ["node", "node-addons"],
    },
    moduleFileExtensions: ["js", "vue", "json"],
    collectCoverage: true,
    collectCoverageFrom: [
      "./**/*.{js,vue}",
      "!**/coverage/**",
      "!**/public/**",
      '!**/jest.config.js',
      '!**/babel.config.js',
      '!**/vite.config.js',
      '!**/main.js',
    ],
  };
  