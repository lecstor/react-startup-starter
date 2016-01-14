import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import TopNavApp from '../components/top-nav-app';
import SideNavApp from '../components/side-nav-app';

import '../styles/core.scss';

const mapStateToProps = (state) => ({
  user: state.user,
});

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
        <TopNavApp userLabel={user.data.email} loggingOut={user.loggingOut} />
        <div className="view-container">
          <div className="container">
            <Grid><Row>
              <Col xs={12} md={2}>
                <SideNavApp />
              </Col>
              <Col xs={12} md={10}>
                {this.props.children}
              </Col>
            </Row></Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LayoutApp);
