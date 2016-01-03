import React from 'react';

import AltTopNav from '../components/alt-top-nav';

import '../styles/core.scss';

export default class AppLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
  }
  render () {
    return (
      <div className="page-container">
        <AltTopNav />
        <div className="view-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
