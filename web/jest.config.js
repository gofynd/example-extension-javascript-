module.exports = {
    verbose: true,
    coverageReporters: ['json-summary', 'lcov'],
    moduleFileExtensions: ['js', 'json', 'vue'],
    setupFiles: ['./jest.init.js'],
    testMatch: ['**/__tests__/**/*.spec.js'],
    transform: {
        '.*\\.(vue)$': 'vue-jest',
        '^.+\\.js$': './../node_modules/babel-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    coveragePathIgnorePatterns: [],
    coverageDirectory: './../coverage/',
    collectCoverage: true,
    collectCoverageFrom: ['./**/*.{js,vue}', '!**/node_modules/**'],
    transformIgnorePatterns: [
        "/node_modules/",
    ],
    bail: true 
};
