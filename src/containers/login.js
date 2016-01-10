import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginForm from '../components/login-form';

import { login } from '../store/modules/auth';
import { createStashSetFn, createStashEventValueFn } from '../store/modules/stash';

// don't use pure function components for screens or react-transform-hmr won't work for us (for now)

// We'll use the Redux `connect` function to simplify the process of setting the
// properties in our component.

// Map the parts of the app state object that our component needs, to properties
// of our component.
const mapStateToProps = (state) => ({
  form: state.loginForm,
  error: state.auth.error,
  loggingIn: state.auth.loggingIn,
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
    this.props.actions.stash('password', '');
  }

  // set default for params to handle route path with no params
  render () {
    const { actions, email, password, loggingIn, error, params = {} } = this.props;
    const formProps = {
      email, password, loggingIn, error,
      handleSubmit: (subEmail, subPassword) =>
        actions.login({ email: subEmail, password: subPassword }, params.splat),
      onInputChange: actions.stashEvent,
    };
    return (
      <div className="container text-center">
        <h1>This is the login view!</h1>
        <p>email: "ok@example.com" password: "password"</p>
        <p>"boom" to break the server</p>
        <div className="text-left col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-offset-4 col-lg-4">
          <LoginForm {...formProps} />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  error: PropTypes.object,
  actions: PropTypes.object.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  loggingIn: PropTypes.bool,
  params: PropTypes.object,
};


// connect our LoginForm component to redux state and dispatch methods
export default connect(mapStateToProps, mapDispatchToProps)(Login);
