import React, { Component, PropTypes } from 'react';
import Spinner from 'spin.js';

// based on react-spin (https://github.com/thomasboyt/react-spin)
// using spin.js       (http://fgnass.github.io/spin.js/)

export default class Spin extends Component {
  static propTypes = {
    config: PropTypes.object,
  };

  componentDidMount () {
    this.spinner = new Spinner(this.props.config);
    this.spinner.spin(this.refs.container);
  }

  render () {
    return (<span ref="container" />);
  }
}
