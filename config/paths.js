const { resolve } = require('path');

const basePath = resolve(__dirname, '..');

module.exports = {
  dist: resolve(basePath, 'dist'),
};
