import React, { PropTypes } from 'react';

import Alert from '../../elements/alert';
import Button from '../../elements/button';
import Form from '../../elements/form';
import Input from '../../elements/input';

import inputSty from '../../elements/input/index.css';

const UserDetailsForm = (
  { actions, name, email, isSaving, saveDisabled, handleSave, error, serverError }
) => (
  <Form onSubmit={handleSave}>
    {serverError && <Alert type="error">{serverError}</Alert>}
    <div className={inputSty.label}>Your Name</div>
    <Input label="Your Name" name="name" type="text" placeholder="your name"
      onChange={actions.stashEvent} value={name}
    />
    <div className={inputSty.label}>Email/Login</div>
    <Input name="email" type="email" placeholder="your email address"
      onChange={actions.stashEvent} value={email}
    />
    {error && error.email && <Alert type="warning">{error.email}</Alert>}

    <div style={{ textAlign: 'right', marginBottom: '5px' }}>
      <Button type="safe" floatRight active={isSaving} disabled={saveDisabled} onClick={handleSave}>
        Save
      </Button>
    </div>
  </Form>
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
