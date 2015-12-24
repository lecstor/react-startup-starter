import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import { signup } from '../../store/modules/auth';
import { setEmail } from '../../store/modules/signup-form';

// We'll use the Redux `connect` function to simplify the process of setting the
// properties in our component.

// Map the parts of the app state object that our component needs, to properties
// of our component.
const mapStateToProps = (state) => ({
  form: state.signupForm,
  email: state.signupForm.email,
  signupError: state.auth.signupError,
  error: state.auth.error,
  signingUp: state.auth.signingUp,
});

// Map action dispatch functions to properties of our component.
// `bindActionCreators` will wrap each of our action creators in a function that
// will call dispatch on the store with our action.
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ signup, setEmail }, dispatch),
});

/**
 * [description]
 * @param   {Object}   options.actions             [description]
 * @param   {Function} options.actions.signup      [description]
 * @param   {Function} options.actions.setEmail    [description]
 * @param   {Error}    options.error               [description]
 * @param   {String}   options.signupError.error   [description]
 * @param   {String}   options.signupError.email   [description]
 * @param   {String}   options.email               [description]
 * @param   {Boolean}  options.signingUp           [description]
 * @returns {Component}                            [description]
 */
const SignupForm = ({ actions, email, signingUp, error, signupError = { props: {} } }) => {
  const emailErr = signupError.props.email;
  const emailAlert = emailErr ? 'error' : undefined;

  const handleChange = action => {
    return event => {
      return action(event.target.value);
    };
  };

  const handleSubmit = () => {
    return actions.signup({ email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Email" type="email" placeholder="email" onChange={handleChange(actions.setEmail)} value={email}
        bsStyle={emailAlert} hasFeedback={emailAlert ? true : false}
      />
      <div style={{ textAlign: 'right', marginBottom: '5px' }}>
        <Button active={signingUp} onClick={handleSubmit}> Log In </Button>
      </div>
      {error && <Alert bsStyle="danger">{error.message}</Alert>}
      {emailErr && <Alert bsStyle="warning">{emailErr}</Alert>}
    </form>
  );
};

SignupForm.propTypes = {
  error: PropTypes.object,
  signupError: PropTypes.object,
  actions: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  signingUp: PropTypes.bool,
};

export { SignupForm };

// connect our SignupForm component to redux state and dispatch methods
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
