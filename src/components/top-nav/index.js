import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// Export bare component for testing
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
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
              <NavItem>Sign Up</NavItem>
            </LinkContainer>}
            {!auth.user &&
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>}
            {auth.user &&
            <LinkContainer to="/logout">
              <NavItem>Logout</NavItem>
            </LinkContainer>}
          </Nav>
          {auth.user &&
          <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{auth.user.email}</strong>.</p>}
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

// set pure to false to render after changing to a dynamic route (see below)
export default connect(mapStateToProps, null, null, { pure: false })(TopNav);

// *There is likely a better solution for this*
//
// Dynamic Routes (React-Router) https://github.com/rackt/react-router/blob/latest/docs/guides/advanced/DynamicRouting.md
//
// When using dynamic routes, with TopNav as a pure component, TopNav is not
// re-rendered the first time a dynamic route is loaded preventing the selected
// link from displaying as "active".
//
// connect options
// [pure = true] (Boolean): If true, implements shouldComponentUpdate and shallowly
// compares the result of mergeProps, preventing unnecessary updates, assuming that
// the component is a “pure” component and does not rely on any input or state other
// than its props and the selected Redux store’s state. Defaults to true
//
// https://github.com/rackt/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
