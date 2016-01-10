import React, { PropTypes } from 'react';

import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';

/**
 * Signup Form Component
 * @param   {Function} options.onInputChange
 * @param   {Function} options.handleSubmit
 * @param   {Object}   options.error
 * @param   {String}   options.error.message
 * @param   {String}   options.error.props.email
 * @param   {String}   options.error.props.password
 * @param   {Number}   options.error.server.status
 * @param   {String}   options.error.server.message
 * @param   {String}   options.email
 * @param   {Boolean}  options.signingUp
 * @returns {Component}
 */
const SignupForm = ({ email, signingUp, error, handleSubmit, onInputChange }) => {
  const err = error ? { ...error, ...error.props } : {};
  const emailAlert = err.email ? 'error' : undefined;

  const submit = () => handleSubmit(email);

  return (
    <form onSubmit={submit}>
      <Input label="Email" name="email" type="email" placeholder="email" onChange={onInputChange} value={email}
        bsStyle={emailAlert} hasFeedback={emailAlert ? true : false}
      />
      <div style={{ textAlign: 'right', marginBottom: '5px' }}>
        <Button active={signingUp} onClick={submit}> Log In </Button>
      </div>
      {err.server && <Alert bsStyle="danger">{err.server.message}</Alert>}
      {err.email && <Alert bsStyle="warning">{err.email}</Alert>}
    </form>
  );
};

SignupForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  signingUp: PropTypes.bool,
  error: PropTypes.object,
  email: PropTypes.string,
};

export default SignupForm;
