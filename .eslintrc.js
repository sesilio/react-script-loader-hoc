/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: '2018',
  },

  extends: ['airbnb'],

  globals: {
    __DEV__: true,
  },

  env: {
    browser: true,
  },

  rules: {
    'import/extensions': 'off',

    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],

    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

    'react/prefer-stateless-function': 'off',
    'no-confusing-arrow': 'off',
    'no-underscore-dangle': 'off',
    'react/prop-types': 'off',
    'no-mixed-operators': 'off',
    'import/no-unresolved': 'off',
  },

  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules'],
      },
    },
  },
};
