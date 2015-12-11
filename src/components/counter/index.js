import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from './action-creators';
import createButton from '../../components-pure/button';

// We'll use the Redux `connect` function to simplify the process of setting the
// properties in our component.

// Map the parts of the app state object that our component needs to properties
// of our component.
const mapStateToProps = (state) => ({
  counter: state.counter,
  routerState: state.routing,
});

// Map action dispatch functions to properties of our component.
// `bindActionCreators` will wrap earch of our action creators in a function that
// will call dispatch on the store with or action.
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

// get an instance of the pure function Button component
const Button = createButton(React);

// export the Counter class itself to use in tests.
export class Counter extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    counter: React.PropTypes.number,
  }
  render () {
    return (
      <div className="text-center">
        <h2>Sample Counter: {this.props.counter}</h2>
        <Button className="btn btn-default"
                onClick={this.props.actions.increment}
                label="Incrementor" />
      </div>
    );
  }
}

// export the Counter class connected to our Redux store.
// `connect` is a "higher order functi"
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
