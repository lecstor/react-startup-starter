import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  userState: state.user,
});

const UserContainer = ({ userState }) => {
  const userLabel = userState.data ? userState.data.email : undefined;
  React.cloneElement(this.props.children, { userState, userLabel });
};

UserContainer.propTypes = {
  children: PropTypes.node,
  userState: PropTypes.object,
};

export default connect(mapStateToProps)(UserContainer);
