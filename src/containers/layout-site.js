import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TopNav from '../components/top-nav';

import '../styles/core.scss';

const mapStateToProps = (state) => ({
  user: state.user,
});

export class LayoutSite extends Component {
  static propTypes = {
    children: PropTypes.element,
    user: PropTypes.object,
  }
  render () {
    const { user } = this.props;
    const userLabel = user.data ? user.data.email : undefined;

    return (
      <div className="page-container">
        <TopNav userLabel={userLabel} loggingIn={user.loggingIn} loggingOut={user.loggingOut} />
        <div className="view-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LayoutSite);
