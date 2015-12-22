import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from '../routes';
import { load } from '../store/modules/auth';

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
        <Router history={this.props.history}>
          {routes}
        </Router>
      </Provider>
    );
  }
}
