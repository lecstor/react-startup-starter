import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

// Export bare component for testing
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export default class AltTopNav extends Component {
  render () {
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
            <LinkContainer to="/l/signup">
              <NavItem>Sign Up</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
