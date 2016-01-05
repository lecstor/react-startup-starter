import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { LinkContainer } from 'react-router-bootstrap';

import AltTopNav from '../components/alt-top-nav';

import '../styles/core.scss';

export default class LayoutApp extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
  }
  render () {
    return (
      <div className="page-container">
        <AltTopNav />
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
