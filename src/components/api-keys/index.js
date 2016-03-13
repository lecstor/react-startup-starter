import React, { Component, PropTypes } from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Spinner from '../../components/spinner';
import ApiKey from './api-key';
import CreateApiKey from './api-key/create';

export default class ApiKeys extends Component {
  render () {
    const { apikeys, newKeyProps, apiKeyProps, editKeySelect, spinnerConf } = this.props;
    return (
      <div style={{ textAlign: 'left', maxWidth: '800px' }}>
        <h1>API Keys</h1>
        <Row style={{ marginTop: '30px' }}><Col xs={12}>
          <CreateApiKey {...newKeyProps} />
        </Col></Row>
        {apikeys.loading && <Spinner config={spinnerConf} />}
        {apikeys.data.map(apikey => (
          <ApiKey key={apikey.id} apikey={apikey} {...apiKeyProps}
            editKeySelect={editKeySelect(apikey.id, apikey.label)}
          />
        ))}
      </div>
    );
  }
}

ApiKeys.propTypes = {
  apikeys: PropTypes.object,
  newKeyProps: PropTypes.object,
  apiKeyProps: PropTypes.object,
  editKeySelect: PropTypes.func,
  spinnerConf: PropTypes.object,
};
