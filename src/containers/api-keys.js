import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import Row from 'react-bootstrap/lib/Row';
// import Col from 'react-bootstrap/lib/Col';

// import Spinner from '../../components/spinner';
// import ApiKey from '../../components/api-key';
// import CreateApiKey from '../../components/api-key/create';

import { createStashSetFn, createStashEventValueFn } from '../store/modules/stash';
import { createKey, updateKey, deleteKey, load as loadApiKeys } from '../store/modules/apikeys';

const mapStateToProps = (state) => ({
  apikeys: state.apikeys,
  ...state.stash.apikeysForm,
});

const stash = createStashSetFn('apikeysForm');
const stashEvent = createStashEventValueFn('apikeysForm');

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    createKey, updateKey, deleteKey, stash, stashEvent, loadApiKeys,
  }, dispatch),
});

export class ApiKeys extends Component {
  componentWillMount () {
    this.props.actions.loadApiKeys();
  }
  render () {
    const { actions, apikeys, newKeyLabel, editKeyId, editKeyLabel } = this.props;
    const newKey = () => {
      actions.createKey({ label: newKeyLabel });
      actions.stash({ newKeyLabel: undefined });
    };
    const newKeyProps = { newKey, newKeyLabel, updateLabel: actions.stashEvent };
    const apiKeyProps = {
      actions,
      editKeyId,
      editKeyLabel,
      stashEditLabel: actions.stashEvent,
    };
    const spinnerConf = { left: '20%', top: '20%' };
    const editKeySelect = (apikeyId, apikeyLabel) => () => {
      actions.stash({ editKeyLabel: apikeyLabel, editKeyId: apikeyId });
    };

    return React.cloneElement(this.props.children,
      { apikeys, newKeyProps, apiKeyProps, editKeySelect, spinnerConf }
    );
  }
}

ApiKeys.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.object.isRequired,
  apikeys: PropTypes.object,
  newKeyLabel: PropTypes.string,
  editKeyId: PropTypes.string,
  editKeyLabel: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiKeys);
