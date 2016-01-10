import path from 'path';
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import history from 'connect-history-api-fallback';
import uuid from 'node-uuid';

import { omit, values, find, remove } from 'lodash';

import sessions from 'client-sessions';
import cookieParser from 'cookie-parser';

import config from 'config';
import bodyParser from 'body-parser';

const webpackConfig = require(path.join('../', config.get('webpack_config_file')));

const app = express();
const compiler = webpack(webpackConfig);

const STORE = {
  user_a5c7651399a6423caf8f794a6f033311: {
    user: { id: 'user_a5c7651399a6423caf8f794a6f033311', email: 'ok@example.com', password: 'password' },
    account: {
      apikeys: [
        { label: 'Marketing', id: 'live_d99b7bc0b7784a2fb58b7899c946955a', disabled: false },
        { label: 'Billing', id: 'live_31ed432cd186400ab32e09a602837d3c', disabled: true },
        { label: 'Billing (Test)', id: 'test_8cf7c437ccf545bf810b099b15bbe0cd', disabled: false, test: true },
      ],
    },
  },
};

function getStore (req) {
  if (req.my_session.user && STORE[req.my_session.user.id]) return STORE[req.my_session.user.id];
  return null;
}

function userByEmail (email) {
  return find(values(STORE), store => store.user.email === email);
}

function newStore (email) {
  const store = {
    user: { email, id: uuid.v4() },
    account: {
      apikeys: [],
    },
  };
  STORE[store.user.id] = store;
  return store;
}

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

app.get('/auth', (req, res) => {
  res.type('application/json');
  if (req.my_session.user && req.my_session.user.id) {
    return res.send({ result: req.my_session.user });
  }
  res.send({ result: undefined });
});

app.delete('/auth', (req, res) => {
  req.my_session.user = undefined;
  setTimeout(() => {
    res.send({});
  }, 1000);
});

app.post('/auth/signup', (req, res) => {
  const body = req.body;
  res.type('application/json');
  setTimeout(() => {
    if (body.email) {
      const store = newStore(body.email);
      req.my_session.user = store.user;
      res.set('status', 200).send({ result: store.user });
    } else {
      res.set('status', 200).send({ error: { message: 'Signup failed', props: { email: 'The email address must be an email address' } } });
    }
    res.end();
  }, 1000);
});

app.post('/auth/login', (req, res) => {
  const body = req.body;
  res.type('application/json');
  setTimeout(() => {
    const store = userByEmail(body.email);
    if (store) {
      if (body.password === store.user.password) {
        req.my_session.user = omit(store.user, 'password');
        res.set('status', 200).send({ result: req.my_session.user });
      } else {
        res.set('status', 200).send({ error: { message: 'Login failed', props: { password: 'The password is incorrect' } } });
      }
    } else if (body.password === 'boom' || body.email === 'boom') {
      res.sendStatus(500);
    } else {
      res.set('status', 200).send({ error: { message: 'Login failed', props: { email: 'Account not found for that email address' } } });
    }
    res.end();
  }, 500);
});

app.get('/apikeys', (req, res) => {
  const store = getStore(req);
  if (!store) return res.send(403);

  setTimeout(() => {
    const keys = store.account ? store.account.apikeys || [] : [];
    res.send({ result: keys });
  }, 2000);
});

app.post('/apikeys', (req, res) => {
  const store = getStore(req);
  if (!store) return res.send(403);

  const key = req.body;
  res.type('application/json');

  key.id = key.test ? 'test_' : 'live_' + uuid.v4().replace(/-/g, '');
  store.account.apikeys.push(key);
  res.set('status', 200).send({ result: key });
});

app.delete('/apikeys/:apikeyId', (req, res) => {
  const store = getStore(req);
  remove(store.account.apikeys, { id: req.params.apikeyId });
  res.send({});
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../src', 'index.html'));
// });

app.listen(config.get('server_port'), config.get('server_host'), (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://${config.get('server_host')}:${config.get('server_port')}`);
});
