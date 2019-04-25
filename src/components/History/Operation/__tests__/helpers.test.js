import * as helpers from '../helpers';

describe('statusText', () => {
  test('pending', () => {
    expect(helpers.statusText('pending', 'receive')).toEqual('Receiving');
    expect(helpers.statusText('pending', 'send')).toEqual('Sending');
    expect(helpers.statusText('pending', 'exchange-in')).toEqual('Exchange');
    expect(helpers.statusText('pending', 'exchange-out')).toEqual('Exchange');
    expect(helpers.statusText('pending', 'detokenize')).toEqual('Detokenize');
    expect(helpers.statusText('pending', 'tokenize')).toEqual('Tokenize');
    expect(helpers.statusText('pending', 'any other status')).toEqual('');
  });

  test('done', () => {
    expect(helpers.statusText('processed', 'receive')).toEqual('Received');
    expect(helpers.statusText('processed', 'send')).toEqual('Sent');
    expect(helpers.statusText('processed', 'exchange-in')).toEqual('Exchange');
    expect(helpers.statusText('processed', 'exchange-out')).toEqual('Exchange');
    expect(helpers.statusText('processed', 'detokenize')).toEqual('Detokenize');
    expect(helpers.statusText('processed', 'tokenize')).toEqual('Tokenize');
    expect(helpers.statusText('processed', 'any other status')).toEqual('');
  });

  test('failed', () => {
    expect(helpers.statusText('failed', 'receive')).toEqual('Receiving failed');
    expect(helpers.statusText('failed', 'send')).toEqual('Sending failed');
    expect(helpers.statusText('failed', 'exchange-in')).toEqual(
      'Exchange failed'
    );
    expect(helpers.statusText('failed', 'exchange-out')).toEqual(
      'Exchange failed'
    );
    expect(helpers.statusText('failed', 'detokenize')).toEqual(
      'Detokenization failed'
    );
    expect(helpers.statusText('failed', 'tokenize')).toEqual(
      'Tokenization failed'
    );
    expect(helpers.statusText('failed', 'any other status')).toEqual('Failed');
  });

  test('failed', () => {
    expect(helpers.statusText('any other state', 'any other status')).toEqual(
      'Unknown'
    );
  });
});

test('getIndicatorType', () => {
  expect(helpers.getIndicatorType('pending')).toEqual('pending');
  expect(helpers.getIndicatorType('processed', 'receive')).toEqual('receive');
  expect(helpers.getIndicatorType('processed', 'send')).toEqual('send');
  expect(helpers.getIndicatorType('processed', 'exchange-in')).toEqual(
    'exchange'
  );
  expect(helpers.getIndicatorType('processed', 'exchange-out')).toEqual(
    'exchange'
  );
  expect(helpers.getIndicatorType('processed', 'detokenize')).toEqual(
    'detokenize'
  );

  expect(helpers.getIndicatorType('processed', 'tokenize')).toEqual('tokenize');
  expect(helpers.getIndicatorType('failed', 'exchange-out')).toEqual('failed');
  expect(helpers.getIndicatorType('any other type')).toEqual('unknown');
  expect(helpers.getIndicatorType(null)).toEqual('unknown');
});

test('operationSign', () => {
  expect(helpers.operationSign('receive')).toEqual('+');
  expect(helpers.operationSign('tokenize')).toEqual('+');
  expect(helpers.operationSign('exchange-in')).toEqual('+');

  expect(helpers.operationSign('send')).toEqual('-');
  expect(helpers.operationSign('detokenize')).toEqual('-');
  expect(helpers.operationSign('exchange-out')).toEqual('-');
});

test('getDisplayAmount', () => {
  expect(helpers.getDisplayAmount('-', 2)).toBe('-2');
});
