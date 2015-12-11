import React from 'react';

import TopNav from '../components/top-nav';

import '../styles/core.scss';

export default class AppLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
  }
  render () {
    return (
      <div className="page-container">
        <TopNav />
        <div className="view-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
