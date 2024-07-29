module.exports = {
  verbose: true,
  coverageReporters: ["json-summary", "lcov", "cobertura"],
  moduleFileExtensions: ["js", "json", "vue"],
  setupFiles: ["./jest.init.js"],
  testMatch: ['**/__tests__/**/*.spec.js'],
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
  coverageDirectory: './coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    "./**/*.{js,vue}",
    "!**/node_modules/**",
    "!**/test/**",
    "!**/coverage/**",
    "!**/jest.config.js",
    "!**/main.js",
    '!**/vue.config.js',
    '!**/babel.config.js',
    "!**/coverage_output.js/**",
    "!**/coverage_output.json/**"
  ],
};
