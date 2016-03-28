import React, { PropTypes } from 'react';
import get from 'lodash/get';

import Alert from '../../elements/alert';
import Button from '../../elements/button';
import Form from '../../elements/form';
import Input from '../../elements/input';

import inputSty from '../../elements/input/index.css';

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
  formFields = {}, error, serverError,
  loggingIn,
  handleSubmit, onInputChange,
}) => (
  <Form onSubmit={handleSubmit}>
    {serverError && <Alert type="error">{serverError}</Alert>}
    <div className={inputSty.label}>Email</div>
    <Input name="email" type="email" placeholder="email" value={formFields.email}
      onChange={onInputChange}
    />
    {get(error, 'fields.email') && <Alert type="warning">{error.fields.email}</Alert>}
    <div className={inputSty.label}>Password</div>
    <Input name="password" type="password" placeholder="password" value={formFields.password}
      onChange={onInputChange}
    />
    {get(error, 'fields.password') && <Alert type="warning">{error.fields.password}</Alert>}
    <Button type="safe" floatRight active={loggingIn} onClick={handleSubmit}>Log In</Button>
  </Form>
);

LoginForm.propTypes = {
  formFields: PropTypes.object,
  emailAlert: PropTypes.string,
  passAlert: PropTypes.string,
  loggingIn: PropTypes.bool,
  error: PropTypes.object,
  serverError: PropTypes.string,
  handleSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
};

export default LoginForm;
