module.exports = {
  moduleDirectories: ['node_modules'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['**/src/**/*.js'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      lines: 100,
      functions: 100,
    },
  },
};
