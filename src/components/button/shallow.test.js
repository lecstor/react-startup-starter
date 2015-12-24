import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';

import createButton from './';

const Button = createButton(React);

// const clickCount
test('Button', nest => {
  nest.test('...with no parameters', assert => {
    const msg = 'should render an empty button';

    const text = '<button>  </button>';
    const re = new RegExp(text, 'g');
    const props = {
      // actions: createActions()
    };

    const $ = shallow(<Button { ...props } />);
    const output = $.html();

    const actual = re.test(output);
    const expected = true;

    assert.equal(actual, expected, msg);

    assert.end();
  });

  nest.test('...with a label', assert => {
    const msg = 'should render a button with a label';

    const text = '<button> Click Me </button>';
    const re = new RegExp(text, 'g');

    const $ = shallow(<Button label="Click Me" />);
    const output = $.html();
    assert.comment(output);

    const actual = re.test(output);
    const expected = true;

    assert.equal(actual, expected, msg);

    assert.end();
  });

  nest.test('...should act on a click', assert => {
    const msg = 'button clicked once';

    let click = 0;

    const props = {
      label: 'Click Me',
      onClick: () => click++,
    };
    const button = shallow(<Button { ...props }/>);
    button.simulate('click');

    assert.equal(click, 1, msg);

    assert.end();
  });
});
