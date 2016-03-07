import React, { PropTypes } from 'react';

import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';

/**
 * Signup Form Component
 * @param   {Object}   options
 * @param   {Object}   options.formFields
 * @param   {String}   options.formFields.name
 * @param   {String}   options.formFields.email
 * @param   {String}   options.formFields.password
 * @param   [{String}] options.emailAlert
 * @param   {Object}   options.error
 * @param   {String}   options.error.message
 * @param   {String}   options.error.fields.email
 * @param   {String}   options.error.fields.password
 * @param   {Number}   options.error.server.status
 * @param   {String}   options.error.server.message
 * @param   {Boolean}  options.signingUp
 * @param   {Function} options.onInputChange
 * @param   {Function} options.handleSubmit
 * @returns {Component}
 */
const SignupForm = (
  { formFields = {}, emailAlert, error, signingUp, onInputChange, handleSubmit }
) => (
  <form onSubmit={handleSubmit}>
    <Input label="Your Name" name="name" type="text" placeholder="name"
      onChange={onInputChange} value={formFields.name}
    />
    <Input label="Email" name="email" type="email" placeholder="email"
      onChange={onInputChange} value={formFields.email}
      bsStyle={emailAlert} hasFeedback={emailAlert}
    />
    <Input label="Password" name="password" type="password" placeholder="password"
      onChange={onInputChange} value={formFields.password}
    />
    <div style={{ textAlign: 'right', marginBottom: '5px' }}>
      <Button active={signingUp} onClick={handleSubmit}> Sign Up </Button>
    </div>
    {error.server && <Alert bsStyle="danger">{error.server.message}</Alert>}
    {error.fields && error.fields.email && <Alert bsStyle="warning">{error.fields.email}</Alert>}
  </form>
);

SignupForm.propTypes = {
  formFields: PropTypes.object,
  emailAlert: PropTypes.string,
  signingUp: PropTypes.bool,
  error: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default SignupForm;
