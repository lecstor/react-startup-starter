var webpack = require('webpack');
var appConfig = require('config');

module.exports = function (config) {
  config.set({

    // logLevel: 'LOG_DEBUG',

    browsers: appConfig.get('tests.karma.browsers'),

    // when restartOnFileChange is true no tests are run on
    // on change. Karma runs 0 tests..
    // restartOnFileChange: true,

    frameworks: ['tap'],

    files: [
      'webpack/tests.js'
    ],

    preprocessors: {
      'webpack/tests.js': ['webpack', 'sourcemap']
    },

    reporters: ['dots', 'coverage'],

    webpack: {
      devtool: 'inline-source-map',
      module: {
        preLoaders: [{
          test: /\.(js|jsx)$/,
          include: /src/,
          exclude: /node_modules/,
          loader: 'isparta'
        }],
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets: ['react', 'es2015', 'stage-0']
            }
          },
          {
            test: /\.json$/,
            loader: 'json',
          },
          {
            test: /\.css$/,
            loaders: [
              'style-loader',
              'css-loader?modules&importLoaders=1&localIdentName=[path][name]__[local]___[hash:base64:5]!postcss-loader'
            ],
          },
          {
            test: /sinon\.js$/,
            loader: 'imports?define=>false,require=>false'
          }
        ]
      },
      resolve: {
        alias: {
          sinon: 'sinon/pkg/sinon'
        }
      },
      isparta: {
        embedSource: true,
        noAutoWrap: true,
        // these babel options will be passed only to isparta and not to babel-loader
        babel: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      // fix issues with using enzyme
      externals: {
        jsdom: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',
        'text-encoding': 'window'
      },
      // fix? issue with tape dep on fs
      node : { fs: 'empty' }
    },

    coverageReporter : {
      reporters : [
        { type : 'text-summary' },
        { type : 'html', dir : 'coverage' }
      ]
    },

    webpackServer: {
      noInfo: true
    }

  });
};
