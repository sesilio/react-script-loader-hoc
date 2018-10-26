module.exports = {
  moduleDirectories: ['node_modules'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['**/src/**/*.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
