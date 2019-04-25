import localStorage from 'utils/localStorage';

const EXCHANGE_MODE_KEY = 'isProExchangeMode';
const DEFAULT_VALUE = false;

export const saveExchangeMode = isPro => {
  localStorage.set(EXCHANGE_MODE_KEY, isPro);
};

export const isProExchangeMode = () =>
  localStorage.get(EXCHANGE_MODE_KEY) || DEFAULT_VALUE;
