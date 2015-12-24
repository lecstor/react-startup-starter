import React from 'react';
import { connect } from 'react-redux';

import LoginForm from '../components/login-form';
import { logout } from '../store/modules/auth';

export class LogoutView extends React.Component {
  static propTypes = {
    logout: React.PropTypes.func.isRequired,
  }
  componentWillMount () {
    this.props.logout();
  }
  render () {
    return (
      <div className="container text-center">
        <h1>This is the logout view!</h1>
        <p>You can log back in..</p>
        <div className="text-left col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-offset-4 col-lg-4">
          <LoginForm />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({ logout: () => dispatch(logout()) });

export default connect(undefined, mapDispatchToProps)(LogoutView);
