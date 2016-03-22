import React from 'react';

import sty from '../styles/common.css';

// don't use pure function components for views or
// react-transform-hmr won't work for us (for now)
export class IndexSite extends React.Component {
  render () {
    return (
      <div className="text-center">
        <div className={sty.contentHeading}>Welcome to the React Startup Starter!</div>
        <hr />
      </div>
    );
  }
}

export default IndexSite;
