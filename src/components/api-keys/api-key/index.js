import React, { PropTypes } from 'react';

import Input from '../../elements/input';

import sty from './index.css';

const ApiKey = ({ apikey, actions, editKeyId, editKeyLabel, stashEditLabel, editKeySelect }) => {
  const idStyle = {};
  if (apikey.disabled) idStyle.color = '#FF2222';
  const enabledAction = () => actions.updateKey({ id: apikey.id, disabled: !apikey.disabled });
  const saveEdit = () => {
    actions.updateKey({ id: apikey.id, label: editKeyLabel });
    actions.stash({ editKeyId: undefined });
  };
  const cancelEdit = () => actions.stash({ editKeyId: undefined });
  const deleteKey = () => actions.deleteKey(apikey);

  const enabledLabel = apikey.disabled ? 'Enable' : 'Disable';
  const enabledButton = apikey.disabled ? 'enableButton' : 'disableButton';
  const editingLabel = editKeyId === apikey.id;

  return (
    <div className={sty.key}>
      {editingLabel &&
        <div>
          <Input name="editKeyLabel" styles={sty} type="text"
            value={editKeyLabel} onChange={stashEditLabel}
          />
          <button className={sty.saveButton} onClick={saveEdit}>
            Save
          </button>
          <button className={sty.cancelButton} onClick={cancelEdit}>
            Cancel
          </button>
        </div>
      }
      {!editingLabel &&
        <div className={sty.keyLabel} onClick={editKeySelect}>
          <strong>{apikey.label}</strong>
        </div>
      }
      <div className={sty.keyId}>{apikey.id}</div>
      <div className={sty.buttonBar}>
        <button className={sty[enabledButton]} onClick={enabledAction}>{enabledLabel}</button>
        <button className={sty.deleteButton} onClick={deleteKey}>Delete</button>
      </div>
    </div>
  );
};

ApiKey.propTypes = {
  apikey: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  editKeyId: PropTypes.string,
  editKeyLabel: PropTypes.string,
  stashEditLabel: PropTypes.func.isRequired,
  editKeySelect: PropTypes.func.isRequired,
};

export default ApiKey;
