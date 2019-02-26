const autoprefixer = require('autoprefixer');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

const autoprefixerOptions = {
  browsers: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
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
        test: /\.less$/,
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
              ],
            },
          },
          { loader: require.resolve('less-loader') },
        ],
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
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
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
    },
    extensions: ['.js', '.json', '.jsx', '.less'],
  },
};
