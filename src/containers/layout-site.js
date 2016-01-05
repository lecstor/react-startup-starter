import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TopNav from '../components/top-nav';

import '../styles/core.scss';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default class LayoutSite extends Component {
  static propTypes = {
    children: PropTypes.element,
    auth: PropTypes.object,
  }
  render () {
    const { auth } = this.props;

    return (
      <div className="page-container">
        <TopNav {...auth} />
        <div className="view-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LayoutSite);
