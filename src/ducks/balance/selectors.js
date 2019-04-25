import { createSelector } from 'reselect';

import { ASSET } from 'enums/asset';
import translate from 'services/translate';
import AssetAmount from 'models/AssetAmount';
import { externalHistorySelectors } from 'ducks/history/external';
import { reduceById } from 'utils/frp';

const PREFIX = 'OTN';

const formatBalance = (balance, isTokenized) => {
  const isCore = balance.name === ASSET.OTN;
  isTokenized = isCore ? false : isTokenized;

  const name = translate(['coins', balance.name, 'name']);

  return {
    ...balance,
    displayAmount: AssetAmount.parse(balance.amount, balance.precision),
    isCore,
    isTokenized,
    displayName: isTokenized ? `${PREFIX}.${balance.name}` : balance.name,
    fullName: isTokenized
      ? translate('common.tokenizedAssetName', { name })
      : name
  };
};

const getFormatter = (isTokenized = true) => balance =>
  formatBalance(balance, isTokenized);

const plain = state => state.balance.assets;

const balances = createSelector(plain, balances =>
  balances.map(getFormatter())
);

const balanceNames = createSelector(balances, balances =>
  balances.map(balance => balance.displayName)
);

const tokenized = createSelector(balances, balances =>
  balances.filter(balance => !balance.isCore).map(getFormatter())
);

const hasTokenized = createSelector(
  tokenized,
  tokenizedBalances => tokenizedBalances.length !== 0
);

const native = createSelector(balances, balances =>
  balances.map(getFormatter(false))
);

const notEmpty = createSelector(balances, balances =>
  balances.filter(balance => balance.amount)
);

const hasBalances = createSelector(notEmpty, assets => assets.length !== 0);

const notEmptyTokenized = createSelector(notEmpty, balances =>
  balances.filter(balance => !balance.isCore)
);

const notEmptyTokenizedWithPending = createSelector(
  balances,
  externalHistorySelectors.pendingByAssetId,
  (balances, mappings) =>
    balances.filter(
      balance => (balance.amount || mappings[balance.id]) && !balance.isCore
    )
);

const hasNotEmptyTokenized = createSelector(
  notEmptyTokenized,
  balances => balances.length !== 0
);

const notEmptyNames = createSelector(notEmpty, balances =>
  balances.map(balance => balance.displayName)
);

const core = createSelector(balances, balances =>
  balances.find(balance => balance.isCore)
);

const exchangeScheme = createSelector(balances, core, (balances, core) =>
  balances.reduce((scheme, balance) => {
    if (balance.isCore) {
      scheme[balance.id] = balances;
    } else if ([ASSET.BTC, ASSET.ETH].includes(balance.name)) {
      scheme[balance.id] = balances.filter(
        b =>
          b.isCore ||
          ([ASSET.BTC, ASSET.ETH].includes(b.name) && balance.id !== b.id)
      );
    } else {
      scheme[balance.id] = [core];
    }

    return scheme;
  }, {})
);

const balancesMap = createSelector(balances, reduceById);

export default {
  plain,
  balances,
  balanceNames,
  tokenized,
  native,
  notEmpty,
  notEmptyTokenized,
  notEmptyNames,
  core,
  exchangeScheme,

  hasBalances,
  hasTokenized,
  hasNotEmptyTokenized,

  notEmptyTokenizedWithPending,

  balancesMap
};
