const config = require('config');

var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  // json: true,
  entry: {
    app: [
      './src/index'
    ],
    vendor: [
      'history',
      'react',
      'react-redux',
      'react-router',
      'redux',
      'react-router-redux'
    ]
  },
  output: {
    path: path.join(__dirname, '../', 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  plugins: [
    // new webpack.NoErrorsPlugin()
    new webpack.DefinePlugin(config.get('globals')),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        warnings: false,
        unused: true,
        dead_code: true
      },
      sourceMap: false // if true, uses SourceMaps to map error message locations to modules.
                       // This slows down the compilation
    }),
    new HtmlWebpackPlugin({
      template : path.join(__dirname, '../', 'src', 'index.html'),
      hash     : false,
      filename : 'index.html',
      inject   : 'body',
      minify   : {
        collapseWhitespace : true
      }
    }),
    new ExtractTextPlugin('[name].[hash].css'),

    // https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js',
      minChunks: Infinity
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '../', 'src'),
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        // https://github.com/webpack/extract-text-webpack-plugin
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
      }
    ]
  }
};
