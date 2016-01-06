import React, { Component } from 'react';
import { Router } from 'react-router';

import { Provider } from 'react-redux';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import getRoutes from '../routes';

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
  render () {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <Router history={this.props.history} routes={getRoutes(store)} />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
