const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const configMerge = require('webpack-merge');

const commonConfig = require('./webpack.config.common');

module.exports = configMerge(commonConfig, {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
  ],
  devServer: {
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
    port: 3000,
    // host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://api.livello.com',
        secure: false,
      },
    },
  },
  performance: {
    hints: false,
  },
});
