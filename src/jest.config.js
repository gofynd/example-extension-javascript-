module.exports = {
  verbose: true,
  coverageReporters: ["json-summary", "lcov", "cobertura"],
  moduleFileExtensions: ["js", "json", "vue"],
  setupFiles: ["./jest.init.js"],
  testMatch: ["**/__tests__/**/*.spec.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  testEnvironment: "jsdom", // Simulate a browser environment for testing
  moduleFileExtensions: ["js", "vue", "json"],
  coverageDirectory: "./../coverage/",
  collectCoverage: true,
  collectCoverageFrom: [
    "./**/*.{js,vue}",
    "!**/node_modules/**",
    "!**/test/**",
    "!**/coverage/**",
  ],
};
