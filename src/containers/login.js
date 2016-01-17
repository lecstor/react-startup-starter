import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { login } from '../store/modules/user';
import { createStashSetFn, createStashEventValueFn } from '../store/modules/stash';

// don't use pure function components for screens or react-transform-hmr won't work for us (for now)

// We'll use the Redux `connect` function to simplify the process of setting the
// properties in our component.

// Map the parts of the app state object that our component needs, to properties
// of our component.
const mapStateToProps = (state) => ({
  error: state.user.error,
  loggingIn: state.user.loggingIn,
  ...state.stash.loginForm,
});

const stash = createStashSetFn('loginForm');
const stashEvent = createStashEventValueFn('loginForm');

// Map action dispatch functions to properties of our component.
// `bindActionCreators` will wrap each of our action creators in a function that
// will call dispatch on the store with our action.
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ login, stash, stashEvent }, dispatch),
});

export class Login extends Component {

  componentWillUnmount () {
    // don't leave the password in the stash
    this.props.actions.stash({ password: '' });
  }

  // set default for params to handle route path with no params
  render () {
    const { actions, email, password, loggingIn, error = {}, params = {} } = this.props;

    const passAlert = error.fields && error.fields.password ? 'error' : undefined;
    let emailAlert = error.fields && error.fields.email ? 'error' : undefined;
    if (passAlert) emailAlert = 'success';

    const formProps = {
      email, password, loggingIn, emailAlert, passAlert, error,
      handleSubmit: () => actions.login({ email, password }, params.splat),
      onInputChange: actions.stashEvent,
    };
    return (
      <div>
        {React.Children.map(this.props.children, child => React.cloneElement(child, formProps))}
      </div>
    );
  }
}

Login.propTypes = {
  children: PropTypes.node,
  error: PropTypes.object,
  actions: PropTypes.object.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  loggingIn: PropTypes.bool,
  params: PropTypes.object,
};


// connect our LoginForm component to redux state and dispatch methods
export default connect(mapStateToProps, mapDispatchToProps)(Login);
