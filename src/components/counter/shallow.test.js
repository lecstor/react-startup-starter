import React from 'react';
import tape from 'blue-tape';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import deepFreeze from 'deep-freeze';

import { Counter } from './';

import reducers from './action-reducers';
import actions from './action-creators';

// Component

tape('Counter - Component', nest => {
  nest.test('  Shallow Render Tests', test => {
    const props = {
      actions: { increment: sinon.spy() },
      counter: 3,
    };
    const reaCounter = shallow(<Counter {...props} />);

    test.equal(reaCounter.type(), 'div', 'counter node is a div');
    test.ok(reaCounter.is('div'), 'node is a div');
    test.equal(reaCounter.find('h2').length, 1, 'node has a header');
    test.equal(reaCounter.find('.btn-default').length, 1, 'found button by class');

    // why can I only find my button by class?
    // test.equal(reaCounter.find('button').length, 1, 'found button by tag');
    // test.equal(reaCounter.find('Button').length, 1, 'found button by string constructor name (shouldn\'t work with pure component?)');
    // test.equal(reaCounter.find(Button).length, 1, 'Found button by reference');

    test.ok(/Sample Counter: 3/.test(reaCounter.text()), 'props.counter rendered');

    test.equal(reaCounter.props().className, 'text-center', 'props className ok');
    test.equal(reaCounter.props().children.length, 2, 'props has 2 children');

    test.equal(reaCounter.state(), null, 'state is null');

    // not that we should, but we can..
    // const html = '<div class="text-center"><h2>Sample Counter: 3</h2><button class="btn btn-default"> Incrementor </button></div>';
    // test.equal(reaCounter.html(), html, 'html as expected');

    test.ok(/Sample Counter: 3/.test(reaCounter.text()), 'text ok');

    test.end();
  });
});

// Actions

tape('INCREMENT_COUNTER', nest => {
  nest.test('...initial', assert => {
    const message = `should set { counter: 0 }`;

    const expected = 0;
    const actual = reducers();

    assert.equal(actual, expected, message);
    assert.end();
  });

  nest.test(`...with { counter: 3 }`, assert => {
    const message = 'should increment counter';

    const stateBefore = 3;
    const action = actions.increment();
    const expected = 4;

    deepFreeze(stateBefore);
    deepFreeze(action);

    const actual = reducers(stateBefore, action);

    assert.equal(actual, expected, message);
    assert.end();
  });
});
