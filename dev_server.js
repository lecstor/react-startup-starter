var path = require('path');
var express = require('express');
var webpack = require('webpack');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var history = require('connect-history-api-fallback');

var config = require('config');
var webpackConfig = require(config.get('webpack_config_file'));

var app = express();
var compiler = webpack(webpackConfig);

app.use(history());

app.use(devMiddleware(compiler, {
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
}));

app.use(hotMiddleware(compiler));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(config.get('server_port'), config.get('server_host'), function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://' + config.get('server_host') + ':' + config.get('server_port'));
});
