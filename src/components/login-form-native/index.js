import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginForm from '../../components-pure/login-form';
import { login } from '../../store/modules/auth';
import { setEmail, setPassword } from '../../store/modules/login-form';

// We'll use the Redux `connect` function to simplify the process of setting the
// properties in our component.

// Map the parts of the app state object that our component needs, to properties
// of our component.
const mapStateToProps = (state) => ({
  form: state.loginForm,
  email: state.loginForm.email,
  password: state.loginForm.password,
  error: state.auth.loginError,
  loggingIn: state.auth.loggingIn,
});

// Map action dispatch functions to properties of our component.
// `bindActionCreators` will wrap each of our action creators in a function that
// will call dispatch on the store with our action.
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ login, setEmail, setPassword }, dispatch),
});

// connect our LoginForm component to redux state and dispatch methods
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
