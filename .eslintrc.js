module.exports = {
  extends: [
    'airbnb',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/jsx-filename-extension': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
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
