import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import omit from 'lodash/object/omit';

import { createKey, updateKey, deleteKey } from '../../store/modules/apikeys';

const mapStateToProps = (state) => ({
  apikeys: [
    // ...state.account.apikeys,
    { id: '54321', key: 'api_54321abcd54321abcd54321abcd' },
  ],
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ createKey, updateKey, deleteKey }, dispatch),
});

export default class ApiKeys extends Component {
  render () {
    const { actions, apikeys } = this.props;

    return (
      <div className="container text-center">
        <h1>API Keys</h1>
        <div className="text-left col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-offset-4 col-lg-4">
        </div>
      </div>
    );
  }
}

ApiKeys.propTypes = {
  actions: PropTypes.object.isRequired,
  apikeys: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiKeys);
