import React, { PropTypes } from 'react';
import get from 'lodash/get';

import Input from '../../elements/input';
import Alert from 'react-bootstrap/lib/Alert';

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
  formFields = {}, emailAlert, passAlert, error, serverError,
  loggingIn,
  handleSubmit, onInputChange,
}) => (
  <form onSubmit={handleSubmit}>
    <div className={sty.label}>Email</div>
    <Input error={emailAlert} name="email" type="email" placeholder="email"
      onChange={onInputChange} value={formFields.email}
    />
    <div className={sty.label}>Password</div>
    <Input error={passAlert} name="password" type="password" placeholder="password"
      onChange={onInputChange} value={formFields.password}
    />
    <div className={sty.buttonContainer}>
      <button className={sty.button} active={loggingIn}
        onClick={handleSubmit}
      > Log In </button>
    </div>
    {serverError && <Alert bsStyle="danger">{serverError}</Alert>}
    {get(error, 'fields.email') && <Alert bsStyle="warning">{error.fields.email}</Alert>}
    {get(error, 'fields.password') && <Alert bsStyle="warning">{error.fields.password}</Alert>}
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
