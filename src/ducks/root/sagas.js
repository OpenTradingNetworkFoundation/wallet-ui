import { all, takeEvery, call } from 'redux-saga/effects';

import localStorage from 'utils/localStorage';

import { assetsSagas } from '../assets';
import { balanceSagas } from '../balance';
import { idleSagas } from '../idle';
import { loginSagas } from '../login';
import { signUpSagas } from '../sign-up';
import { feeSagas } from '../fee/send';
import { sendFundsSagas } from '../send-funds';
import { toastSagas } from '../toast';
import { exchangeFeeSagas } from '../fee/exchange';
import { exchangeFundsSagas } from '../exchange-funds';
import { tokenizeSagas } from '../tokenize';
import { userLookUpSagas } from '../user-look-up';
import { internalHistorySagas } from '../history/internal';
import { externalHistorySagas } from '../history/external';
import { toastManagerSagas } from '../toast-manager';
import { detokenizeFeeSagas } from '../fee/detokenize';
import { gatewaySagas } from '../gateway';
import { gatewayFeeSagas } from '../fee/gateway';
import { detokenizeFundsSagas } from '../detokenize-funds';
import { routerSagas } from '../router';
import { orderBookSagas } from '../order-book';
import { ratesSagas } from '../rates';
import { errorHandlerSagas } from '../errorHandler';
import { connectionManagerSagas } from '../connection-manager';
import { profileSagas } from '../profile';
import { blockchainMetaSagas } from '../blockchain-meta';
import { addressValidationSagas } from '../address-validation';
import { serviceStatusSagas } from '../serviceStatus';

import actions from './actions';

export const resetLocalStorage = () => localStorage.resetStorage();

export function* resetStore() {
  yield call(resetLocalStorage);
}

export function* watchRoot() {
  yield takeEvery(actions.resetStore, resetStore);
}

function* rootSaga() {
  yield all([
    assetsSagas.watch(),
    balanceSagas.watch(),
    idleSagas.watch(),
    loginSagas.watch(),
    signUpSagas.watch(),
    feeSagas.watch(),
    sendFundsSagas.watch(),
    toastSagas.watch(),
    exchangeFeeSagas.watch(),
    exchangeFundsSagas.watch(),
    tokenizeSagas.watch(),
    userLookUpSagas.watch(),
    internalHistorySagas.watch(),
    externalHistorySagas.watch(),
    toastManagerSagas.watch(),
    detokenizeFeeSagas.watch(),
    gatewaySagas.watch(),
    gatewayFeeSagas.watch(),
    detokenizeFundsSagas.watch(),
    routerSagas.watch(),
    orderBookSagas.watch(),
    ratesSagas.watch(),
    errorHandlerSagas.watch(),
    connectionManagerSagas.watch(),
    profileSagas.watch(),
    blockchainMetaSagas.watch(),
    addressValidationSagas.watch(),
    serviceStatusSagas.watch(),
    watchRoot()
  ]);
}

export default { rootSaga };
