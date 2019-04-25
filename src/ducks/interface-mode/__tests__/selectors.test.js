import selectors from '../selectors';

describe('Interface mode selectors', () => {
  const state = {
    interfaceMode: {
      mode: 'Light'
    }
  };

  test('histoty', () => {
    expect(selectors.interfaceMode(state)).toEqual(state.interfaceMode);
  });

  test('mode', () => {
    expect(selectors.mode(state)).toEqual('Light');
  });

  test('isPro === false', () => {
    expect(selectors.isPro(state)).toEqual(false);
  });

  test('isPro === true', () => {
    expect(selectors.isPro({ interfaceMode: { mode: 'Pro' } })).toEqual(true);
  });
});
