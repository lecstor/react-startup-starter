import React, { PropTypes } from 'react';

import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';


const UserDetailsForm = (
  { actions, name, email, bsStyle, bsFeed, isSaving, saveDisabled, handleSave, error }
) => (
  <form onSubmit={handleSave}>
    <Input label="Your Name" name="name" type="text" placeholder="your name"
      onChange={actions.stashEvent} value={name}
    />
    <Input label="Email/Login" name="email" type="email" placeholder="your email address"
      onChange={actions.stashEvent} value={email} bsStyle={bsStyle} hasFeedback={bsFeed}
    />
    <div style={{ textAlign: 'right', marginBottom: '5px' }}>
      <Button active={isSaving} disabled={saveDisabled} bsStyle="success" onClick={handleSave}>
        Save
      </Button>
    </div>
    {error.server && <Alert bsStyle="danger">{error.server.message}</Alert>}
    {error.email && <Alert bsStyle="warning">{error.email}</Alert>}
  </form>
);

UserDetailsForm.propTypes = {
  actions: PropTypes.object,
  name: PropTypes.string,
  email: PropTypes.string,
  bsStyle: PropTypes.string,
  bsFeed: PropTypes.string,
  isSaving: PropTypes.bool,
  saveDisabled: PropTypes.bool,
  error: PropTypes.object,
  handleSave: PropTypes.func.isRequired,
};

export default UserDetailsForm;
