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
  userState: state.user,
  formFields: state.stash.loginForm,
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
    const { actions, formFields, userState, params = {} } = this.props;
    const error = userState.saga === 'logIn' ? userState.error : undefined;
    const formProps = {
      handleSubmit: (e) => {
        e.preventDefault();
        console.log('handleSubmit');
        actions.login(formFields, params.splat);
      },
      onInputChange: actions.stashEvent,
    };
    if (formFields) formProps.formFields = formFields;
    if (userState.loggingIn) formProps.loggingIn = userState.loggingIn;
    if (error) {
      if (error.isServer) {
        formProps.serverError = error.statusText;
      } else {
        formProps.error = userState.error;
      }
      if (error.fields) {
        if (error.fields.email) formProps.emailAlert = 'error';
        if (error.fields.password) {
          formProps.passAlert = 'error';
          formProps.emailAlert = 'success';
        }
      }
    }
    return React.cloneElement(this.props.children, formProps);
  }
}

Login.propTypes = {
  children: PropTypes.node,
  userState: PropTypes.object,
  actions: PropTypes.object.isRequired,
  formFields: PropTypes.object,
  params: PropTypes.object,
};


// connect our LoginForm component to redux state and dispatch methods
export default connect(mapStateToProps, mapDispatchToProps)(Login);
