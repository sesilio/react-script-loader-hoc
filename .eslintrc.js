module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: '2018',
  },

  extends: ['airbnb', 'eslint-config-prettier'],
  plugins: ['import', 'jest'],
  env: {
    browser: true,
    'jest/globals': true,
  },

  rules: {
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],

    'react/jsx-filename-extension': ['error', {extensions: ['.js', '.jsx']}],

    'react/prefer-stateless-function': 'off',
    'no-confusing-arrow': 'off',
    'no-underscore-dangle': 'off',
    'no-mixed-operators': 'off',
  },
};
