import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TopNav from '../../components/top-nav';
import SideNav from '../../components/side-nav';

import Login from '../../components/login';
import Signup from '../../components/signup';

import { logout } from '../../store/modules/user';

import 'normalize.css/normalize.css';
import '../../styles/global.css';

// import '../styles/core.css';

import sty from './index.css';

const mapStateToProps = (state) => ({
  userState: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ logout }, dispatch),
});

class LayoutDefault extends Component {
  render () {
    const { userState, children, actions } = this.props;
    const userLabel = userState.data ? userState.data.email : undefined;
    return (
      <div className={sty.screen}>
        <TopNav userState={userState} userLabel={userLabel} logOut={actions.logout} />
        {userState.data &&
          <div className={sty.page}>
            <div className={sty.sideNav}>
              <SideNav />
            </div>
            <div className={sty.content}>
              {children}
            </div>
          </div>
        }
        {!userState.data && !userState.loading &&
          <div className={sty.page}>
            <div className={sty.loginForm}>
              <div className={sty.heading}>Log In</div>
              <Login />
              <div className={sty.heading}>or Sign Up!</div>
              <Signup />
            </div>
          </div>
        }
      </div>
    );
  }
}

LayoutDefault.propTypes = {
  children: React.PropTypes.element,
  userState: PropTypes.object,
  actions: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutDefault);
