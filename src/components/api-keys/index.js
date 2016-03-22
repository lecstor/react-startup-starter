import React, { Component, PropTypes } from 'react';

import Spinner from '../../components/spinner';
import ApiKey from './api-key';
import CreateApiKey from './api-key/create';

// import sty from '../../styles/common.css';
import sty from './index.css';

export default class ApiKeys extends Component {
  render () {
    const { apikeys, newKeyProps, apiKeyProps, editKeySelect, spinnerConf } = this.props;
    return (
      <div>
        <div className={sty.heading}>API Keys</div>
        <div className={sty.container}>
          <CreateApiKey {...newKeyProps} />
          {apikeys.loading && <Spinner config={spinnerConf} />}
          {apikeys.data.map(apikey => (
            <ApiKey key={apikey.id} apikey={apikey} {...apiKeyProps}
              editKeySelect={editKeySelect(apikey.id, apikey.label)}
            />
          ))}
        </div>
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
