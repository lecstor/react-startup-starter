import tape from 'blue-tape';
import deepFreeze from 'deep-freeze';

// we'll use deepFreeze on our state and actions to ensure that
// they are not modified by the reducer.

import reducer,
  {
      clearStash, setValue, setValueFromEvent,
      createStashSetFn, createStashEventValueFn,
  } from '../stash';

tape('===== stash.test.js =====', tests => {
  tests.test('== Action Creators ==', nest => {
    nest.test('clearStash', test => {
      const expected = { type: 'rss/stash/CLEAR_STASH', result: { stash: 'mystash' } };
      test.deepEqual(clearStash('mystash'), expected, 'clearStash returns correct action');
      test.end();
    });

    nest.test('setValue', test => {
      const expected = {
        type: 'rss/stash/SET_VALUE',
        result: { stash: 'mystash', value: { mykey: 'myvalue' } },
      };
      test.deepEqual(
        setValue('mystash', { mykey: 'myvalue' }),
        expected,
        'setValue returns correct action'
      );
      test.end();
    });

    nest.test('setValueFromEvent', test => {
      const expected = {
        type: 'rss/stash/SET_VALUE',
        result: { stash: 'mystash', value: { mykey: 'myvalue' } },
      };
      const event = { target: { name: 'mykey', value: 'myvalue' } };
      test.deepEqual(
        setValueFromEvent('mystash', event),
        expected,
        'setValueFromEvent returns correct action'
      );
      test.end();
    });
  });

  tests.test('== Action Creator Function Creators ==', nest => {
    nest.test('createStashSetFn', test => {
      const actionCreator = createStashSetFn('mystash');
      const expected = {
        type: 'rss/stash/SET_VALUE',
        result: { stash: 'mystash', value: { mykey: 'myvalue' } },
      };
      test.deepEqual(
        actionCreator({ mykey: 'myvalue' }),
        expected,
        'createStashSetFn returns working action creator'
      );
      test.end();
    });

    nest.test('createStashEventValueFn', test => {
      const actionCreator = createStashEventValueFn('mystash');
      const expected = {
        type: 'rss/stash/SET_VALUE',
        result: { stash: 'mystash', value: { mykey: 'myvalue' } },
      };
      const event = { target: { name: 'mykey', value: 'myvalue' } };
      test.deepEqual(
        actionCreator(event),
        expected, 'createStashEventValueFn returns working action creator'
      );
      test.end();
    });
  });

  tests.test('== reducer ==', nest => {
    nest.test('no action, no state', test => {
      const expected = {};
      const state = reducer();
      test.deepEqual(state, expected, 'default returns no state ok');
      test.end();
    });

    nest.test('no action', test => {
      const expected = { mystash: { mykey: 'myvalue' } };
      const stateBefore = { mystash: { mykey: 'myvalue' } };
      deepFreeze(stateBefore);
      const state = reducer(stateBefore);
      test.deepEqual(state, expected, 'default returns state ok');
      test.end();
    });

    nest.test('set from empty state', test => {
      const action = setValue('mystash', { mykey: 'myvalue' });
      const expected = { mystash: { mykey: 'myvalue' } };
      const stateBefore = {};
      deepFreeze(stateBefore);
      deepFreeze(action);
      const state = reducer(stateBefore, action);
      test.deepEqual(state, expected, 'property set ok');
      test.end();
    });

    nest.test('set from non-empty state - add key', test => {
      const action = setValue('mystash', { mykey2: 'myvalue2' });
      const expected = { mystash: { mykey: 'myvalue', mykey2: 'myvalue2' } };
      const stateBefore = { mystash: { mykey: 'myvalue' } };
      deepFreeze(stateBefore);
      deepFreeze(action);
      const state = reducer(stateBefore, action);
      test.deepEqual(state, expected, 'property set ok');
      test.end();
    });

    nest.test('set from non-empty state - replace key', test => {
      const action = setValue('mystash', { mykey: 'myvalue2' });
      const expected = { mystash: { mykey: 'myvalue2' } };
      const stateBefore = { mystash: { mykey: 'myvalue' } };
      deepFreeze(stateBefore);
      deepFreeze(action);
      const state = reducer(stateBefore, action);
      test.deepEqual(state, expected, 'property set ok');
      test.end();
    });

    nest.test('set from non-empty state - replace one of two keys', test => {
      const action = setValue('mystash', { mykey: 'myvalueB' });
      const expected = { mystash: { mykey: 'myvalueB', mykey2: 'myvalue2' } };
      const stateBefore = { mystash: { mykey: 'myvalue', mykey2: 'myvalue2' } };
      deepFreeze(stateBefore);
      deepFreeze(action);
      const state = reducer(stateBefore, action);
      test.deepEqual(state, expected, 'property set ok');
      test.end();
    });

    nest.test('clear state', test => {
      const action = clearStash('mystash');
      const expected = { mystash: {} };
      const stateBefore = { mystash: { mykey: 'myvalue' } };
      deepFreeze(stateBefore);
      deepFreeze(action);
      const state = reducer(stateBefore, action);
      test.deepEqual(state, expected, 'stash cleared ok');
      test.end();
    });
  });
});

