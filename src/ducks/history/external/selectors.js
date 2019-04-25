import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';

import { assetsSelectors } from 'ducks/assets';
import AssetAmount from 'src/models/AssetAmount';
import { EXTERNAL_STATUS } from 'enums/operation';

const history = state => state.externalHistory;
const rawEntries = createSelector(history, history => history.operations);

const operations = createSelector(
  rawEntries,
  assetsSelectors.getAssets,
  (operations, assets) => {
    return operations
      .filter(op => assets.find(asset => asset.id === op.amount.assetId))
      .map(operation => {
        const operationAsset = assets.find(
          asset => asset.id === operation.amount.assetId
        );
        const feeAsset = assets.find(
          asset => asset.id === operation.fee.assetId
        );

        const displayAmount = AssetAmount.parse(
          operation.amount.amount,
          operationAsset.precision
        );

        const feeAmount = AssetAmount.parse(
          operation.fee.amount,
          feeAsset.precision
        );

        return {
          ...operation,
          amount: { amount: displayAmount, asset: operationAsset },
          fee: { amount: feeAmount, asset: feeAsset }
        };
      });
  }
);
const initialLoad = createSelector(history, history => history.initialLoad);

const pending = createSelector(operations, operations =>
  operations.filter(op => op.internalState === EXTERNAL_STATUS.PENDING)
);

const pendingByAssetId = createSelector(pending, operations =>
  groupBy(operations, op => op.amount.asset.id)
);

export default { history, operations, initialLoad, pending, pendingByAssetId };
