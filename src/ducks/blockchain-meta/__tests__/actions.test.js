import actions from '../actions';

describe('Blockchain meta actions', () => {
  test('loadMeta', () => {
    expect(actions.loadMeta.getType()).toContain(
      'app/blockchain-meta/META_REQUEST'
    );
  });

  test('loadMetaSuccess', () => {
    expect(actions.loadMetaSuccess.getType()).toContain(
      'app/blockchain-meta/META_REQUEST_SUCCESS'
    );
  });
});
