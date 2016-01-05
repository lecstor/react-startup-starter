import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginForm from '../components/login-form';

import { login } from '../store/modules/auth';
import { setEmail, setPassword } from '../store/modules/login-form';

// don't use pure function components for screens or react-transform-hmr won't work for us (for now)

// We'll use the Redux `connect` function to simplify the process of setting the
// properties in our component.

// Map the parts of the app state object that our component needs, to properties
// of our component.
const mapStateToProps = (state) => ({
  form: state.loginForm,
  email: state.loginForm.email,
  password: state.loginForm.password,
  loginError: state.auth.loginError,
  error: state.auth.error,
  loggingIn: state.auth.loggingIn,
});

// Map action dispatch functions to properties of our component.
// `bindActionCreators` will wrap each of our action creators in a function that
// will call dispatch on the store with our action.
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ login, setEmail, setPassword }, dispatch),
});

export class Login extends React.Component {

  // these single line functions are nice, and work fine, but they mess with istanbul/test coverage
  // const handleChange = action => event => action(event.target.value);
  // const handleSubmit = () => actions.login({ email, password });

  render () {
    const { actions, email, password, loggingIn, error, loginError } = this.props;
    const formProps = { email, password, loggingIn, error, loginError };
    formProps.handleSubmit = (subEmail, subPassword) => actions.login({ email: subEmail, password: subPassword });
    formProps.emailChange = (event) => actions.setEmail(event.target.value);
    formProps.passwordChange = (event) => actions.setPassword(event.target.value);

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
  loginError: PropTypes.object,
  actions: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loggingIn: PropTypes.bool,
};


// connect our LoginForm component to redux state and dispatch methods
export default connect(mapStateToProps, mapDispatchToProps)(Login);
