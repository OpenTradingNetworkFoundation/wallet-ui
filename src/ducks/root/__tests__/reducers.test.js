import reducer from '../reducers';
import actions from '../actions';

describe('Root reducer', () => {
  test('reset action', () => {
    const state = {
      account: {
        id: '1'
      },
      serviceStatus: {
        status: {
          gateway: true,
          faucet: true,
          node: true
        },
        connection: {
          url: 'url',
          connect: true
        }
      }
    };
    const result = reducer(state, actions.resetStore());

    expect(result.serviceStatus).toBe(state.serviceStatus);
    expect(result.account).not.toEqual(state.account);
  });

  test('any action', () => {
    const state = {
      account: {
        id: '1'
      },
      serviceStatus: {
        status: {
          gateway: true,
          faucet: true,
          node: true
        },
        connection: {
          url: 'url',
          connect: true
        }
      }
    };
    const result = reducer(state, { type: 'app/unknown_action' });

    expect(result.serviceStatus).toBe(state.serviceStatus);
    expect(result.account).toEqual(state.account);
  });
});
