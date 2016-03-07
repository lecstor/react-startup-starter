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
 * @param   {String}   options.error.fields.email
 * @param   {String}   options.error.fields.password
 * @param   {Number}   options.error.server.status
 * @param   {String}   options.error.server.message
 * @param   {Object}   options.formFields
 * @param   {String}   options.formFields.email
 * @param   {String}   options.formFields.password
 * @param   {Boolean}  options.loggingIn
 * @returns {Component}
 */
const LoginForm = ({
  formFields = {}, emailAlert, passAlert, loggingIn, error, handleSubmit, onInputChange,
}) => (
  <form onSubmit={handleSubmit}>
    <Input label="Email" name="email" type="email" placeholder="email"
      onChange={onInputChange} value={formFields.email}
      bsStyle={emailAlert} hasFeedback={emailAlert}
    />
    <Input label="Password" name="password" type="password" placeholder="password"
      onChange={onInputChange} value={formFields.password}
      bsStyle={passAlert} hasFeedback={passAlert}
    />
    <div style={{ textAlign: 'right', marginBottom: '5px' }}>
      <Button active={loggingIn} onClick={handleSubmit}> Log In </Button>
    </div>
    {error.server && <Alert bsStyle="danger">{error.server.message}</Alert>}
    {error.fields && error.fields.email && <Alert bsStyle="warning">{error.fields.email}</Alert>}
    {error.fields && error.fields.password &&
      <Alert bsStyle="warning">{error.fields.password}</Alert>}
  </form>
);

LoginForm.propTypes = {
  formFields: PropTypes.object,
  emailAlert: PropTypes.string,
  passAlert: PropTypes.string,
  loggingIn: PropTypes.bool,
  error: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default LoginForm;
