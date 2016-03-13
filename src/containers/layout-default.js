import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import TopNav from '../components/top-nav';
import SideNav from '../components/side-nav';

import Login from '../components/login';
import Signup from '../components/signup';

import { logout } from '../store/modules/user';

import '../styles/core.scss';

const mapStateToProps = (state) => ({
  userState: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ logout }, dispatch),
});

const loginColStyle = 'col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-offset-4 col-lg-4';

class LayoutDefault extends Component {
  render () {
    const { userState, children, actions } = this.props;
    const userLabel = userState.data ? userState.data.email : undefined;
    return (
      <div className="page-container">
        <TopNav userState={userState} userLabel={userLabel} logOut={actions.logout} />
        <div className="view-container">
          <div className="container">
            {userState.data &&
              <Grid><Row>
                <Col xs={12} md={2}>
                  <SideNav />
                </Col>
                <Col xs={12} md={10}>
                  {children}
                </Col>
              </Row></Grid>
            }
            {!userState.data && !userState.loading &&
              <div className={`text-left ${loginColStyle}`}>
                <h1>Log In</h1>
                <Login />
                <h1>or Sign Up!</h1>
                <Signup />
              </div>
            }
          </div>
        </div>
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
