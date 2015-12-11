const config = require('config');

var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'eval', // 'source-map' : ''
  // resolve: {
  //   root: __dirname + '/src'
  // },
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './src/index'
    ],
    vendor: [
      'history',
      'react',
      'react-redux',
      'react-router',
      'redux',
      'redux-simple-router'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  plugins: [
    // new webpack.NoErrorsPlugin()
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(config.get('globals')),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
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
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          // plugins: [
          //   // ['transform-object-rest-spread'],
          //   // ['transform-class-properties'],
          //   ['react-transform', {
          //     transforms: [
          //       {
          //         transform: 'react-transform-hmr',
          //         imports: ['react'],
          //         locals: ['module']
          //       },
          //       {
          //         transform: 'react-transform-catch-errors',
          //         imports: ['react', 'redbox-react']
          //       }
          //     ]
          //   }]
          // ]
        }
      },
      {
        test    : /\.scss$/,
        loaders : [
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
