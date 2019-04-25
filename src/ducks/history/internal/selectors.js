import { get } from 'lodash';
import { createSelector } from 'reselect';

import { INTERNAL_TYPE } from 'enums/operation';
import { assetsSelectors } from 'ducks/assets';
import AssetAmount from 'models/AssetAmount';
import { profileSelectors } from 'ducks/profile';
import { blockchainMetaSelectors } from 'ducks/blockchain-meta';

const history = state => state.internalHistory;
const initialLoad = createSelector(history, history => history.initialLoad);
const operations = createSelector(history, history => history.operations);

const rawEntries = createSelector(operations, operations => {
  return operations
    .map(operation => {
      const internalType = operation.internalType;

      if (internalType === INTERNAL_TYPE.EXCHANGE) {
        return [
          {
            ...operation,
            key: operation.id + '.' + operation.pays.asset_id,
            internalType: INTERNAL_TYPE.EXCHANGE_OUT,
            amount: {
              amount: operation.pays.amount,
              assetId: operation.pays.asset_id
            }
          },
          {
            ...operation,
            key: operation.id + '.' + operation.receives.asset_id,
            internalType: INTERNAL_TYPE.EXCHANGE_IN,
            amount: {
              amount: operation.receives.amount,
              assetId: operation.receives.asset_id
            }
          }
        ];
      }

      return operation;
    })
    .reduce((res, el) => res.concat(el), []);
});

const entries = createSelector(
  rawEntries,
  assetsSelectors.getAssets,
  profileSelectors.profile,
  blockchainMetaSelectors.lastIrreversibleBlock,
  (operations, assets, profiles, lastIrreversibleBlock) => {
    return operations.map(operation => {
      const operationAsset = assets.find(
        asset => asset.id === operation.amount.assetId
      );
      const feeAsset = assets.find(asset => asset.id === operation.fee.assetId);

      const displayAmount = AssetAmount.parse(
        operation.amount.amount,
        operationAsset.precision
      );

      const feeAmount = AssetAmount.parse(
        operation.fee.amount,
        feeAsset.precision
      );

      const paysAsset = operation.pays
        ? assets.find(asset => asset.id === operation.pays.asset_id)
        : null;
      const pays = operation.pays
        ? {
            amount: AssetAmount.parse(
              operation.pays.amount,
              paysAsset.precision
            ),
            asset: paysAsset
          }
        : null;

      const receivesAsset = operation.receives
        ? assets.find(asset => asset.id === operation.receives.asset_id)
        : null;
      const receives = operation.receives
        ? {
            amount: AssetAmount.parse(
              operation.receives.amount,
              receivesAsset.precision
            ),
            asset: receivesAsset
          }
        : null;

      const from = [INTERNAL_TYPE.RECEIVE, INTERNAL_TYPE.SEND].includes(
        operation.internalType
      )
        ? {
            id: operation.from,
            name: get(profiles, [operation.from, 'name'], '-')
          }
        : null;

      const to = [INTERNAL_TYPE.RECEIVE, INTERNAL_TYPE.SEND].includes(
        operation.internalType
      )
        ? {
            id: operation.to,
            name: get(profiles, [operation.to, 'name'], '-')
          }
        : null;

      return {
        ...operation,
        amount: { amount: displayAmount, asset: operationAsset },
        fee: { amount: feeAmount, asset: feeAsset },
        from,
        to,
        pays,
        receives,
        isIrreversible: operation.blockNumber <= lastIrreversibleBlock
      };
    });
  }
);

const mostRecentId = createSelector(operations, operations => {
  return get(operations, '[0].id');
});

export default { history, initialLoad, operations, mostRecentId, entries };
