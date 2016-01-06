import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushPath } from 'redux-simple-router';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { LinkContainer } from 'react-router-bootstrap';

import TopNavApp from '../components/top-nav-app';

import '../styles/core.scss';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ pushPath }, dispatch),
});

export class LayoutApp extends Component {
  static propTypes = {
    children: React.PropTypes.element,
    actions: PropTypes.object,
    auth: PropTypes.object,
  }
  componentWillMount () {
    if (!this.props.auth.loaded) {
      this.props.actions.pushPath('/login');
    }
  }
  render () {
    const { auth } = this.props;

    return (
      <div className="page-container">
        <TopNavApp {...auth} />
        <div className="view-container">
          <div className="container">
            <div style={{ width: '200px', float: 'left', marginRight: '10px' }}>
              <Nav bsStyle="pills" stacked>
                <LinkContainer to="/app/profile"><NavItem>User Profile</NavItem></LinkContainer>
                <LinkContainer to="/app/account"><NavItem>Account</NavItem></LinkContainer>
                <LinkContainer to="/app/apikeys"><NavItem>API Keys</NavItem></LinkContainer>
              </Nav>
            </div>
            <div style={{ float: 'left' }}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutApp);
