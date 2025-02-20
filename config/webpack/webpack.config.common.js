const autoprefixer = require('autoprefixer');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const ManifestPlugin = require('webpack-manifest-plugin');

const isDev = process.env.NODE_ENV !== 'production';

const autoprefixerOptions = {
  // browsers: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
  flexbox: 'no-2009',
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        use: 'react-hot-loader/webpack',
        include: /node_modules/,
      },
      {
        test: /\.(less|css)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer(autoprefixerOptions),
                require('cssnano')({ preset: 'default' }),
              ],
            },
          },
          { loader: require.resolve('less-loader') },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: {
          test: /\.jsx?$/,
        },
        use: ['babel-loader', '@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },

      {
        test: [/\.eot$/, /\.ttf$/, /\.woff$/, /\.woff2$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
    }),
    new Dotenv({
      safe: true,
    }),
    new ManifestPlugin(),
  ],
  resolve: {
    alias: {
      '../../theme.config$': path.resolve('src', 'styling/theme.config'),
      heading: path.resolve('src', 'styling/heading.less'),
      modules: path.resolve('src', 'modules'),
      './globals/site.variables': path.resolve(
        'src',
        'styling',
        'theme',
        'globals/site.variables',
      ),
      lib: path.resolve('src', 'lib'),
      core: path.resolve('src', 'core'),
      styling: path.resolve('src', 'styling'),
    },
    extensions: ['.js', '.json', '.jsx', '.less'],
  },
};
