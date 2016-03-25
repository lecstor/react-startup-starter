import React, { PropTypes } from 'react';
import get from 'lodash/get';

import Input from '../../elements/input';
import Alert from '../../elements/alert';

import sty from './index.css';

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
  <form onSubmit={handleSubmit}>
    {serverError && <Alert type="error">{serverError}</Alert>}
    <div className={sty.label}>Email</div>
    <Input name="email" type="email" placeholder="email"
      onChange={onInputChange} value={formFields.email}
    />
    {get(error, 'fields.email') && <Alert type="warning">{error.fields.email}</Alert>}
    <div className={sty.label}>Password</div>
    <Input name="password" type="password" placeholder="password"
      onChange={onInputChange} value={formFields.password}
    />
    {get(error, 'fields.password') && <Alert type="warning">{error.fields.password}</Alert>}
    <div className={sty.buttonContainer}>
      <button className={sty.button} active={loggingIn}
        onClick={handleSubmit}
      > Log In </button>
    </div>
  </form>
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
