const config = require('config');

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const modulesValues = require('postcss-modules-values');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'eval', // 'source-map' : ''

  // Use with multiple entry points in webpack
  // https://github.com/glenjamin/webpack-hot-middleware#use-with-multiple-entry-points-in-webpack
  // If you want to use multiple entry points in your webpack config you need to include the
  // hot middleware client in each entry point.
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './src/index',
    ],
    vendor: [
      'webpack-hot-middleware/client',
      'history',
      'react',
      'react-redux',
      'react-router',
      'redux',
      'react-router-redux',
    ],
  },
  output: {
    path: path.join(__dirname, '../', 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  plugins: [
    // new webpack.NoErrorsPlugin()
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(config.get('globals')),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../', 'src', 'index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '../', 'src'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            // ['transform-object-rest-spread'],
            // ['transform-class-properties'],
            ['react-transform', {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module'],
                },
              ],
            }],
          ],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[path][name]__[local]___[hash:base64:5]!postcss-loader'
        ),
      },
    ],
  },
  postcss: [modulesValues, autoprefixer],
};
