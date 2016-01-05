import React, { Component, PropTypes } from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { LinkContainer } from 'react-router-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ pushPath }, dispatch),
});

export class AppView extends Component {
  componentWillMount () {
    if (!this.props.auth.loaded) {
      this.props.actions.pushPath('/login');
    }
  }
  render () {
    return (
      <div className="container">
        <div style={{ width: '200px', float: 'left', marginRight: '10px' }}>
          <Nav bsStyle="pills" stacked>
            <LinkContainer to="/app/profile"><NavItem>User Profile</NavItem></LinkContainer>
            <LinkContainer to="/app/account"><NavItem>Account</NavItem></LinkContainer>
            <LinkContainer to="/app/apikeys"><NavItem>API Keys</NavItem></LinkContainer>
          </Nav>
        </div>
        <div style={{ float: 'left' }}>
          <h1>The App View!</h1>
        </div>
      </div>
    );
  }
}

AppView.propTypes = {
  auth: PropTypes.object,
  actions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
