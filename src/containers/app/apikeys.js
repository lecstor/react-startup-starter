import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import Spinner from '../../components/spinner';
import ApiKey from '../../components/api-key';
import CreateApiKey from '../../components/api-key/create';

import { createStashSetFn } from '../../store/modules/stash';
import { createKey, updateKey, deleteKey } from '../../store/modules/apikeys';

const mapStateToProps = (state) => ({
  apikeys: state.apikeys,
  ...state.stash.newApiKeyForm,
});

const stash = createStashSetFn('newApiKeyForm');

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ createKey, updateKey, deleteKey, stash }, dispatch),
});

export default class ApiKeys extends Component {
  render () {
    const { actions, apikeys, newKeyLabel } = this.props;
    const stashLabel = (event) => actions.stash('newKeyLabel', event.target.value);
    const newKey = () => actions.createKey({ label: newKeyLabel });
    const newKeyProps = { newKey, newKeyLabel, updateLabel: stashLabel };
    const spinnerConf = { left: '20%', top: '20%' };
    return (
      <div style={{ textAlign: 'left', maxWidth: '700px' }}>
        <h1>API Keys</h1>
        {apikeys.loading && <Spinner config={spinnerConf}/>}
        {apikeys.keys.map(apikey => (<ApiKey key={apikey.id} apikey={apikey} actions={actions} />))}
        <Row style={{ marginTop: '30px' }}><Col xs={12}>
          <CreateApiKey {...newKeyProps} />
        </Col></Row>
      </div>
    );
  }
}

ApiKeys.propTypes = {
  actions: PropTypes.object.isRequired,
  apikeys: PropTypes.object,
  newKeyLabel: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiKeys);
