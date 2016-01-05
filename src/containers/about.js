import React from 'react';

// don't use pure function components for views or
// react-transform-hmr won't work for us (for now)
export default class About extends React.Component {
  render () {
    return (
      <div className="container text-center">
        <h1>This is the about view!</h1>
      </div>
    );
  }
}
