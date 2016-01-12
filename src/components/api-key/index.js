import React from 'react';

import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Input from 'react-bootstrap/lib/Input';

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
  const disableBsStyle = apikey.disabled ? 'success' : 'warning';
  const editingKey = editKeyId === apikey.id;

  const SaveButton = (
    <ButtonGroup bsSize="small" style={{ width: '120px' }}>
      <Button bsStyle="success" onClick={saveEdit}>Save</Button>
      <Button bsStyle="warning" onClick={cancelEdit}>Cancel</Button>
    </ButtonGroup>
  );

  return (
    <Row style={{ borderBottom: '1px solid lightgrey', padding: '5px' }}>
      <Col xs={12} md={5}>
        {editingKey && <Input name="editKeyLabel" type="text" buttonAfter={SaveButton} value={editKeyLabel} onChange={stashEditLabel} bsSize="small" />}
        {!editingKey && <div style={{ display: 'inline' }} onClick={editKeySelect}><strong>{apikey.label}</strong></div>}
      </Col>
      <Col xs={8} md={4} style={idStyle}>{apikey.id}</Col>
      <Col xs={4} md={3} style={{ textAlign: 'right' }}>
        <Button style={{ width: '80px', marginRight: '5px' }} bsSize="sm" onClick={enabledAction} bsStyle={disableBsStyle}>
          <Glyphicon glyph="off" /> {enabledLabel}
        </Button>
        <Button style={{ width: '80px' }} bsSize="sm" onClick={deleteKey} bsStyle="danger">
          <Glyphicon glyph="remove" /> Delete
        </Button>
      </Col>
    </Row>
  );
};

export default ApiKey;
