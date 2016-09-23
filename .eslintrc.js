// https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/es6.js

'use strict';

module.exports = {
    'parser': 'babel-eslint',
     'plugins': [
       'react'
     ],
     'ecmaFeatures': {
       'jsx': true,
       'modules': true
     },
     'env': {
       'browser': true,
       'amd': true,
       'es6': true,
       'node': true
     },
     'rules': {
       'comma-dangle': 0,
       'quotes': [ 1, 'single' ],
       'no-undef': 1,
       'global-strict': 0,
       'no-extra-semi': 1,
       'no-underscore-dangle': 0,
       'no-console': 1,
       'no-unused-vars': 1,
       'no-trailing-spaces': [1, { 'skipBlankLines': true }],
       'no-unreachable': 1,
       'no-alert': 0,
       'react/jsx-uses-react': 1,
       // don't allow this.fn.bind(this) in JSX callbacks. we don't want to
       // re-create the same fn every render invocation.
       'react/jsx-no-bind': [1, {
         'allowArrowFunctions': true
       }]
     },

    "globals": {}
};
