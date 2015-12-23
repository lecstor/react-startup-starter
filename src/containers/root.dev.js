import React, { Component } from 'react';
import { Router } from 'react-router';

import { Provider } from 'react-redux';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import routes from '../routes';
import { load } from '../store/modules/auth';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor />
  </DockMonitor>
);

export { DevTools };

export default class Root extends Component {
  static propTypes = {
    store: React.PropTypes.object,
    history: React.PropTypes.object,
  }
  componentWillMount () {
    this.props.store.dispatch(load());
  }
  render () {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <Router history={this.props.history}>
            {routes}
          </Router>
          <DevTools />
        </div>
      </Provider>
    );
  }
}
