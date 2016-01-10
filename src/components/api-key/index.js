import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const ApiKey = ({ apikey, actions }) => {
  const idStyle = {};
  if (apikey.disabled) idStyle.color = '#FF2222';
  const enabledAction = () => actions.updateKey({ id: apikey.id, disabled: !apikey.disabled });
  const enabledLabel = apikey.disabled ? 'Enable' : 'Disable';
  const disableBsStyle = apikey.disabled ? 'success' : 'warning';
  const deleteKey = () => actions.deleteKey(apikey);
  return (
    <Row style={{ borderBottom: '1px solid lightgrey', padding: '5px' }}>
      <Col xs={12} md={4}><strong>{apikey.label}</strong></Col>
      <Col xs={8} md={4} style={idStyle}>{apikey.id}</Col>
      <Col xs={4} md={4} style={{ textAlign: 'right' }}>
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
