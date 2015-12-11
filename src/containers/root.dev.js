import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import DevTools from './dev-tools';

import routes from '../routes';

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
          <Router history={this.props.history}>
            {routes}
          </Router>
          <DevTools />
        </div>
      </Provider>
    );
  }
}
