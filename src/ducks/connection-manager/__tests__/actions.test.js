import actions from '../actions';

describe('connection manager actions', () => {
  test('connect', () => {
    expect(actions.connect.getType()).toContain(
      'app/connectionManager/CONNECT'
    );
  });

  test('disconnect', () => {
    expect(actions.disconnect.getType()).toContain(
      'app/connectionManager/DISCONNECT'
    );
  });

  test('registerConnect', () => {
    expect(actions.registerConnect.getType()).toContain(
      'app/connectionManager/REGISTER_CONNECT'
    );
  });

  test('registerDisconnect', () => {
    expect(actions.registerDisconnect.getType()).toContain(
      'app/connectionManager/REGISTER_DISCONNECT'
    );
  });

  test('attemptReconnect', () => {
    expect(actions.attemptReconnect.getType()).toContain(
      'app/connectionManager/ATTEMPT_RECONNECT'
    );
  });
});
