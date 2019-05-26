module.exports = {
  extends: ['airbnb', 'plugin:import/recommended'],
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'arrow-body-style': 'off',
    'no-confusing-arrow': 'off',
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
