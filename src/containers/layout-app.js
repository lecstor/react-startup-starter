import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import TopNavApp from '../components/top-nav-app';
import SideNavApp from '../components/side-nav-app';

import LoginFormContainer from './login';
import LoginForm from '../components/login-form';

import '../styles/core.scss';

const mapStateToProps = (state) => ({
  user: state.user,
});

const loginColStyle = 'col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-offset-4 col-lg-4';

export class LayoutApp extends Component {
  static propTypes = {
    children: React.PropTypes.element,
    actions: PropTypes.object,
    user: PropTypes.object,
  };
  render () {
    const { user } = this.props;
    return (
      <div className="page-container">
        <TopNavApp userState={user} />
          <div className="view-container">
            <div className="container">
              {user.data &&
                <Grid><Row>
                  <Col xs={12} md={2}>
                    <SideNavApp />
                  </Col>
                  <Col xs={12} md={10}>
                    {this.props.children}
                  </Col>
                </Row></Grid>
              }
              {!user.data && !user.loading &&
                <div className={`text-left ${loginColStyle}`}>
                  <h1>Log In</h1>
                  <LoginFormContainer>
                    <LoginForm />
                  </LoginFormContainer>
                </div>
              }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LayoutApp);
