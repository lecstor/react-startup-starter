import path from 'path';
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import history from 'connect-history-api-fallback';

import sessions from 'client-sessions';
import cookieParser from 'cookie-parser';

import config from 'config';
import bodyParser from 'body-parser';

const webpackConfig = require(path.join('../', config.get('webpack_config_file')));

const app = express();
const compiler = webpack(webpackConfig);

app.use(history());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(sessions({
  cookieName: 'my_session',          // cookie name dictates the key name added to the request object
  secret: 'ssssh',                   // should be a large unguessable string
  duration: 7 * 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 5,     // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

app.use(devMiddleware(compiler, {
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
}));

app.use(hotMiddleware(compiler));

app.post('/auth/login', (req, res) => {
  const values = req.body;
  res.type('application/json');
  if (values.password === 'incorrect') {
    res.set('status', 200).send({ password: 'Wrong password', error: 'Login failed' });
  } else if (values.password === 'correct') {
    if (values.email === 'ok@example.com') {
      req.my_session.user = 'ok@example.com';
      res.set('status', 200).send({ ok: true, user: { id: 123321, email: 'ok@example.com', name: 'Buddy' } });
    } else {
      res.set('status', 200).send({ email: 'No account for that email address', error: 'Login failed' });
    }
  } else {
    res.sendStatus(500);
  }
  res.end();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(config.get('server_port'), config.get('server_host'), (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://${config.get('server_host')}:${config.get('server_port')}`);
});