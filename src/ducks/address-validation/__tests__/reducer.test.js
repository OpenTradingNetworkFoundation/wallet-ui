import reducer from '../reducer';
import actions from '../actions';

test('should initialize state', () => {
  expect(reducer(undefined)).toEqual({
    valid: false
  });
});

test('it should handle validation actions', () => {
  const res = {
    valid: true
  };

  expect(reducer(undefined, actions.validation(res))).toEqual(res);
});
