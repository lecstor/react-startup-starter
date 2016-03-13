import React from 'react';

// don't use pure function components for views or
// react-transform-hmr won't work for us (for now)
export class IndexSite extends React.Component {
  render () {
    return (
      <div className="text-center">
        <h1>Welcome to the React Startup Starter!</h1>
        <hr />
      </div>
    );
  }
}

export default IndexSite;
