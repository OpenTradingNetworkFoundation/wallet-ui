import { call, takeEvery, put } from 'redux-saga/effects';

import { validateWithdrawalAddress } from 'api/gatewayApi';
import { errorHandlerActions } from 'ducks/errorHandler';

import actions from '../actions';
import { watch, validateAddress } from '../sagas';

test('validateAddress saga', () => {
  const generator = validateAddress(
    actions.requestValidate({ address: 'some address', asset: 'OTN' })
  );
  expect(generator.next().value).toEqual(
    call(validateWithdrawalAddress, { address: 'some address', asset: 'OTN' })
  );
});

test('validateAddress error handling', () => {
  const generator = validateAddress(
    actions.requestValidate({ address: 'some address', asset: 'OTN' })
  );

  generator.next();

  expect(generator.throw('error').value).toEqual(
    put(errorHandlerActions.handleGatewayError('error'))
  );
});

test('validateAddress watcher', () => {
  const generator = watch();
  expect(generator.next().value).toEqual(
    takeEvery(actions.requestValidate, validateAddress)
  );
});
