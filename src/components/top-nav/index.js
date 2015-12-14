import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

import * as actions from './actions';

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  user: state.user,
  routerState: state.routing,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export class TopNav extends Component {
  render () {
    const { user } = this.props;
    const styles = require('./style.scss');
    return (
      <Navbar fixedTop className={styles.navbar}>
        <Navbar.Header>
          <Navbar.Brand className={styles.brand}>
            <IndexLink to="/"> React Startup Starter </IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight navbar>
            {!user &&
            <LinkContainer to="/signup">
              <NavItem>Sign up</NavItem>
            </LinkContainer>}
            {!user &&
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>}
            {user &&
            <LinkContainer to="/logout">
              <NavItem className="logout-link">
                Logout
              </NavItem>
            </LinkContainer>}
          </Nav>
          {user &&
          <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{user.name}</strong>.</p>}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

TopNav.propTypes = {
  actions: PropTypes.object,
  user: PropTypes.object,
};


export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
