import path from 'path';
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import history from 'connect-history-api-fallback';
import uuid from 'node-uuid';

import { omit, values, find, findIndex, remove, pick, merge } from 'lodash';

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

function newStore (email, { name, password }) {
  const store = {
    user: {
      email, name, password,
      id: uuid.v4(),
    },
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

// login
app.post('/session', (req, res) => {
  const body = req.body;
  res.type('application/json');
  setTimeout(() => {
    const store = userByEmail(body.email);
    if (store) {
      if (!store.user.password) {
        res.send({ error: { message: 'Login failed', fields: { password: 'You have not set a password yet.' } } });
      } else if (body.password === store.user.password) {
        req.my_session.user = omit(store.user, 'password');
        res.send({ result: { user: req.my_session.user } });
      } else {
        res.send({ error: { message: 'Login failed', fields: { password: 'The password is incorrect' } } });
      }
    } else if (body.password === 'boom' || body.email === 'boom') {
      res.sendStatus(500);
    } else {
      res.send({ error: { message: 'Login failed', fields: { email: 'Account not found for that email address' } } });
    }
    res.end();
  }, 500);
});

app.get('/session', (req, res) => {
  res.type('application/json');
  setTimeout(() => {
    if (req.my_session.user && req.my_session.user.id) {
      return res.send({ result: req.my_session.user });
    }
    res.send({ result: undefined });
  }, 500);
});

// logout
app.delete('/session', (req, res) => {
  req.my_session.user = undefined;
  setTimeout(() => {
    res.send({});
  }, 1000);
});

// signup
app.post('/user', (req, res) => {
  const body = req.body;
  res.type('application/json');
  setTimeout(() => {
    if (body.email) {
      const { name, email, password } = body;
      const store = newStore(email, { name, password });
      req.my_session.user = store.user;
      res.send({ result: store.user });
    } else {
      res.send({ error: { message: 'Signup failed', fields: { email: 'The email address must be an email address' } } });
    }
    res.end();
  }, 1000);
});

app.get('/user', (req, res) => {
  const store = getStore(req);
  setTimeout(() => {
    if (!store) return res.send({});
    res.send({ result: omit(store.user, 'password') });
  }, 1000);
});

// update user details
app.put('/user', (req, res) => {
  const store = getStore(req);
  if (!store) return res.send(403);
  store.user.name = req.body.name;
  store.user.email = req.body.email;
  res.send({ result: omit(store.user, 'password') });
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
  store.account.apikeys.unshift(key);
  res.send({ result: key });
});

app.put('/apikeys/:apikeyId', (req, res) => {
  const store = getStore(req);
  if (!store) return res.send(403);

  const apikeys = store.account.apikeys;
  const idx = findIndex(apikeys, { id: req.params.apikeyId });
  if (idx < 0) res.sendStatus(404);

  const updateProps = pick(req.body, 'label', 'disabled');
  merge(apikeys[idx], updateProps);

  res.send({ result: apikeys[idx] });
});

app.delete('/apikeys/:apikeyId', (req, res) => {
  const store = getStore(req);
  const apikey = remove(store.account.apikeys, { id: req.params.apikeyId });
  if (!apikey) res.sendStatus(404);
  res.sendStatus(204); // all ok, no response content required
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
