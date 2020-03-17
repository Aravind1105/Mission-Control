module.exports = {
  extends: ['airbnb', 'plugin:import/recommended'],
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'arrow-body-style': 'off',
    'no-confusing-arrow': 'off',
    'react/require-default-props': 0,
    'react/prop-types': 0,
    'arrow-parens': [2, 'as-needed'],
    'object-curly-newline': [
      'error',
      {
        ObjectPattern: { multiline: true },
      },
    ],
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack/webpack.config.dev.js',
      },
    },
  },
};
