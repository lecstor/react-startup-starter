import React from 'react';
import tape from 'blue-tape';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';

import Counter from './';

import configureStore from '../../store';

function mountCounter (store) {
  return mount(
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

tape('Counter - Component - Full Render', nest => {
  nest.test('  componentDidMount', test => {
    const store = configureStore();
    sinon.spy(Counter.prototype, 'componentDidMount');
    mountCounter(store);
    test.ok(Counter.prototype.componentDidMount.calledOnce);
    test.end();
  });

  nest.test('  no initial store', test => {
    const store = configureStore();
    const reaCounter = mountCounter(store);
    test.equal(reaCounter.text(), 'Sample Counter: 0 Incrementor ', 'counter is 0');
    test.end();
  });

  nest.test('  initial store with counter preset', test => {
    const store = configureStore({ counter: 2 });
    const reaCounter = mountCounter(store);
    test.equal(reaCounter.text(), 'Sample Counter: 2 Incrementor ', 'counter is 2');
    test.end();
  });

  nest.test('  button click increments counter from none', test => {
    const store = configureStore();
    const reaCounter = mountCounter(store);
    const button = reaCounter.find('Button');
    button.simulate('click');
    test.equal(reaCounter.text(), 'Sample Counter: 1 Incrementor ', 'counter incremented on click');
    test.end();
  });

  nest.test('  button click increments counter from preset', test => {
    const store = configureStore({ counter: 2 });
    const reaCounter = mountCounter(store);
    const button = reaCounter.find('Button');
    button.simulate('click');
    test.equal(reaCounter.text(), 'Sample Counter: 3 Incrementor ', 'counter incremented on click');
    test.end();
  });
});
