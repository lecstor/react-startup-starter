import React, { PropTypes } from 'react';

import Input from '../../elements/input';
import Alert from 'react-bootstrap/lib/Alert';

import sty from './index.css';

const UserDetailsForm = (
  { actions, name, email, bsStyle, bsFeed, isSaving, saveDisabled, handleSave, error, serverError }
) => (
  <form className={sty.form} onSubmit={handleSave}>
    <div className={sty.label}>Your Name</div>
    <Input label="Your Name" name="name" type="text" placeholder="your name"
      onChange={actions.stashEvent} value={name}
    />
    <div className={sty.label}>Email/Login</div>
    <Input name="email" type="email" placeholder="your email address"
      onChange={actions.stashEvent} value={email}
    />
    <div style={{ textAlign: 'right', marginBottom: '5px' }}>
      <button className={sty.button} active={isSaving} disabled={saveDisabled} onClick={handleSave}>
        Save
      </button>
    </div>
    {serverError && <Alert bsStyle="danger">{serverError}</Alert>}
    {error && error.email && <Alert bsStyle="warning">{error.email}</Alert>}
  </form>
);

UserDetailsForm.propTypes = {
  actions: PropTypes.object,
  name: PropTypes.string,
  email: PropTypes.string,
  bsStyle: PropTypes.string,
  bsFeed: PropTypes.bool,
  isSaving: PropTypes.bool,
  saveDisabled: PropTypes.bool,
  error: PropTypes.object,
  serverError: PropTypes.string,
  handleSave: PropTypes.func,
};

export default UserDetailsForm;
