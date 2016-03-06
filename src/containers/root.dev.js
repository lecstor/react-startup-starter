import React, { Component } from 'react';
import { Router } from 'react-router';

import { Provider } from 'react-redux';
import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';

import LogMonitor from 'redux-devtools-log-monitor';
import Inspector from 'redux-devtools-inspector';

import getRoutes from '../routes';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" changeMonitorKey="ctrl-m">
    <Inspector />
    <LogMonitor />
  </DockMonitor>
);

export { DevTools };

export default class Root extends Component {
  static propTypes = {
    store: React.PropTypes.object,
    history: React.PropTypes.object,
  };
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
