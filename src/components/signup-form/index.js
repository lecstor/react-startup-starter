import React, { PropTypes } from 'react';

import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';

/**
 * [description]
 * @param   {Object}   options.emailChange         [description]
 * @param   {Function} options.handleSubmit        [description]
 * @param   {Error}    options.error               [description]
 * @param   {String}   options.signupError.error   [description]
 * @param   {String}   options.signupError.email   [description]
 * @param   {String}   options.email               [description]
 * @param   {Boolean}  options.signingUp           [description]
 * @returns {Component}                            [description]
 */
const SignupForm = ({ emailChange, handleSubmit, email, signingUp, error, signupError = { props: {} } }) => {
  const emailErr = signupError.props.email;
  const emailAlert = emailErr ? 'error' : undefined;

  const submit = () => handleSubmit(email);

  return (
    <form onSubmit={submit}>
      <Input label="Email" type="email" placeholder="email" onChange={emailChange} value={email}
        bsStyle={emailAlert} hasFeedback={emailAlert ? true : false}
      />
      <div style={{ textAlign: 'right', marginBottom: '5px' }}>
        <Button active={signingUp} onClick={submit}> Log In </Button>
      </div>
      {error && <Alert bsStyle="danger">{error.message}</Alert>}
      {emailErr && <Alert bsStyle="warning">{emailErr}</Alert>}
    </form>
  );
};

SignupForm.propTypes = {
  emailChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  signupError: PropTypes.object,
  email: PropTypes.string.isRequired,
  signingUp: PropTypes.bool,
};

export default SignupForm;
