import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ pushPath }, dispatch),
});

export class IndexApp extends Component {
  componentWillMount () {
    if (!this.props.auth.loaded) {
      this.props.actions.pushPath('/login');
    }
  }
  render () {
    return (
      <div>
        <h1>The App View!</h1>
      </div>
    );
  }
}

IndexApp.propTypes = {
  auth: PropTypes.object,
  actions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexApp);
