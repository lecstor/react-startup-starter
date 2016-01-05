import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../store/modules/auth';

export class Logout extends React.Component {
  static propTypes = {
    logout: React.PropTypes.func.isRequired,
  }
  componentWillMount () {
    this.props.logout();
  }
  render () {
    return (
      <div className="container text-center">
        <h1>Logging out..</h1>
        <p>You will be redirected to our site.</p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ logout: () => dispatch(logout()) });

export default connect(undefined, mapDispatchToProps)(Logout);
