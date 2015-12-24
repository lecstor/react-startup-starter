import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

// We define mapStateToProps and mapDispatchToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  auth: state.auth,
  routerState: state.routing,
});

export class TopNav extends Component {
  render () {
    const { auth } = this.props;
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
            {!auth.user &&
            <LinkContainer to="/signup">
              <NavItem>Sign up</NavItem>
            </LinkContainer>}
            {!auth.user &&
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>}
            {auth.user &&
            <LinkContainer to="/logout">
              <NavItem className="logout-link">
                Logout
              </NavItem>
            </LinkContainer>}
          </Nav>
          {auth.user &&
          <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{auth.user.name}</strong>.</p>}
          {auth.loggingIn &&
          <p className={styles.loggedInMessage + ' navbar-text'}>Logging In..</p>}
          {auth.loggingOut &&
          <p className={styles.loggedInMessage + ' navbar-text'}>Logging Out..</p>}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

TopNav.propTypes = {
  actions: PropTypes.object,
  auth: PropTypes.object,
};


export default connect(mapStateToProps)(TopNav);
