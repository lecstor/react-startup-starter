import React, { PropTypes } from 'react';

import Input from '../../elements/input';

import sty from './create.css';

const CreateApiKey = ({ newKeyLabel = '', updateLabel, newKey }) => (
  <div>
    <div className={sty.label}>Generate a New API Key</div>
    <div className={sty.container}>
      <div className={sty.inputContainer}>
        <Input name="newKeyLabel" styles={sty}
          type="text" placeholder="Enter a label for the new API key"
          value={newKeyLabel} onChange={updateLabel}
        />
      </div>
      <div className={sty.buttonContainer}>
        <button className={sty.button} disabled={newKeyLabel ? false : true} onClick={newKey}>
          Generate New API Key
        </button>
      </div>
    </div>
  </div>
);

CreateApiKey.propTypes = {
  newKeyLabel: PropTypes.string,
  updateLabel: PropTypes.func.isRequired,
  newKey: PropTypes.func.isRequired,
};

export default CreateApiKey;
