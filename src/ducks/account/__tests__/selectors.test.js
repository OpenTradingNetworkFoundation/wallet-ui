import selectors from '../selectors';

const state = {
  account: {
    id: '1.2.333',
    name: 'name',
    options: {
      memo_key: 'memo_key'
    },
    active: {
      key_auths: [['active_key']]
    },
    owner: {
      key_auths: [['owner_key']]
    }
  }
};

describe('account selectors', () => {
  test('account', () => {
    expect(selectors.account(state)).toBe(state.account);
  });

  test('accountId', () => {
    expect(selectors.accountId(state)).toBe('1.2.333');
  });

  test('accountPlainId', () => {
    expect(selectors.accountPlainId(state)).toBe('333');
  });

  test('accountName', () => {
    expect(selectors.accountName(state)).toBe('name');
  });

  describe('publicKeys', () => {
    test('with account', () => {
      expect(selectors.publicKeys(state)).toEqual({
        memo: 'memo_key',
        active: 'active_key',
        owner: 'owner_key'
      });
    });

    test('without account', () => {
      expect(selectors.publicKeys({ account: null })).toEqual({});
    });
  });
});
