import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import Input from 'react-bootstrap/lib/Input';

const CreateApiKey = ({ newKeyLabel = '', updateLabel, newKey }) => {
  const InnerButton = <Button bsStyle="success" onClick={newKey}>Generate New API Key</Button>;
  return (
    <Input name="newKeyLabel"
      type="text" label="Generate a New API Key" placeholder="Enter a label for the new API key"
      buttonAfter={InnerButton}
      value={newKeyLabel} onChange={updateLabel}
    />
  );
};

export default CreateApiKey;
