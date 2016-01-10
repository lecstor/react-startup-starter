import React, { PropTypes } from 'react';

import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';

/**
 * Login Form Component
 * @param   {Function} options.onInputChange
 * @param   {Function} options.handleSubmit
 * @param   {Object}   options.error
 * @param   {String}   options.error.message
 * @param   {String}   options.error.props.email
 * @param   {String}   options.error.props.password
 * @param   {Number}   options.error.server.status
 * @param   {String}   options.error.server.message
 * @param   {String}   options.email
 * @param   {String}   options.password
 * @param   {Boolean}  options.loggingIn
 * @returns {Component}
 */
const LoginForm = ({ email, password, loggingIn, error, handleSubmit, onInputChange }) => {
  const err = error ? { ...error, ...error.props } : {};
  const passAlert = err.password ? 'error' : undefined;
  let emailAlert = err.email ? 'error' : undefined;
  if (passAlert) emailAlert = 'success';

  const submit = () => handleSubmit(email, password);

  return (
    <form onSubmit={submit}>
      <Input label="Email" name="email" type="email" placeholder="email" onChange={onInputChange} value={email}
        bsStyle={emailAlert} hasFeedback={emailAlert ? true : false}
      />
      <Input label="Password" name="password" type="password" placeholder="password" onChange={onInputChange} value={password}
        bsStyle={passAlert} hasFeedback={passAlert ? true : false}
      />
      <div style={{ textAlign: 'right', marginBottom: '5px' }}>
        <Button active={loggingIn} onClick={submit}> Log In </Button>
      </div>
      {err.server && <Alert bsStyle="danger">{err.server.message}</Alert>}
      {err.email && <Alert bsStyle="warning">{err.email}</Alert>}
      {err.password && <Alert bsStyle="warning">{err.password}</Alert>}
    </form>
  );
};

LoginForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool,
  error: PropTypes.object,
  email: PropTypes.string,
  password: PropTypes.string,
};

export default LoginForm;
