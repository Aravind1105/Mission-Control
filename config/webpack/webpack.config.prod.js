const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const configMerge = require('webpack-merge');

const commonConfig = require('./webpack.config.common');

const { dist } = require('../paths');

module.exports = configMerge(commonConfig, {
  entry: './src/index.js',
  output: {
    path: dist,
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
  ],
});
