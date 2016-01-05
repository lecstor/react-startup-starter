import React from 'react';
import { Link } from 'react-router';
import Counter from '../components/counter';

// don't use pure function components for views or
// react-transform-hmr won't work for us (for now)
export class IndexSite extends React.Component {
  render () {
    return (
      <div className="container text-center">
        <h1>Welcome to the React Startup Starter!</h1>
        <Counter />
        <hr />
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default IndexSite;
