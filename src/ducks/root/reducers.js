import { combineReducers } from 'redux';
import { pick } from 'lodash';

import accountReducer from '../account';
import assetsReducer from '../assets';
import authReducer from '../auth';
import balanceReducer from '../balance';
import idleReducer from '../idle';
import loginReducer from '../login';
import signUpReducer from '../sign-up';
import feeReducer from '../fee/send';
import sendFundsReducer from '../send-funds';
import exchangeFeeReducer from '../fee/exchange';
import toastReducer from '../toast';
import rates from '../rates';
import detokenizeFeeReducer from '../fee/detokenize';
import tokenizeReducer from '../tokenize';
import translationReducer from '../translation';
import userLookUpReducer from '../user-look-up';
import internalHistory from '../history/internal';
import externalHistory from '../history/external';
import gatewayReducer from '../gateway';
import gatewayFeeReducer from '../fee/gateway';
import detokenizeFundsReducer from '../detokenize-funds';
import orderBook from '../order-book';
import serviceStatus from '../serviceStatus';
import profile from '../profile';
import blockchainMeta from '../blockchain-meta';
import addressValidation from '../address-validation';
import interfaceMode from '../interface-mode';
import errorHandler from '../errorHandler';

import actions from './actions';

const appReducer = combineReducers({
  account: accountReducer,
  idle: idleReducer,
  login: loginReducer,
  signUp: signUpReducer,
  assets: assetsReducer,
  balance: balanceReducer,
  auth: authReducer,
  fee: feeReducer,
  sendFunds: sendFundsReducer,
  toast: toastReducer,
  exchangeFee: exchangeFeeReducer,
  tokenize: tokenizeReducer,
  translation: translationReducer,
  internalHistory,
  externalHistory,
  userLookUp: userLookUpReducer,
  detokenizeFee: detokenizeFeeReducer,
  gateway: gatewayReducer,
  gatewayFee: gatewayFeeReducer,
  detokenizeFunds: detokenizeFundsReducer,
  orderBook,
  rates,
  serviceStatus,
  profile,
  blockchainMeta,
  addressValidation,
  interfaceMode,
  errorHandler
});

// It's necessary to keep some data in state, because it's related to app status (networking, connection, etc).
const getResetState = state => pick(state, ['serviceStatus', 'router', 'idle']);

const rootReducer = (state, action) => {
  const isResetAction = action.type === actions.resetStore.getType();

  return appReducer(isResetAction ? getResetState(state) : state, action);
};

export default rootReducer;
