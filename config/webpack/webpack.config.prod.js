const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const configMerge = require('webpack-merge');

const commonConfig = require('./webpack.config.common');

const { dist } = require('../paths');

module.exports = configMerge(commonConfig, {
  entry: './src/index.js',
  output: {
    path: dist,
    publicPath: '/dist/',
    filename: '[name].[contenthash].bundle.js',
    chunkFilename: '[name].[contenthash].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({ title: 'Caching', template: 'src/index.html' }),
  ],
});
