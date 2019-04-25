import PropTypes from 'prop-types';

import AssetObject from 'props/AssetObject';

export const propTypes = {
  availableAssets: PropTypes.arrayOf(AssetObject),
  fee: PropTypes.shape({
    feeAmount: PropTypes.string,
    isLoading: PropTypes.bool
  }),
  userLookUp: PropTypes.shape({
    isLoading: PropTypes.bool
  }),
  accountName: PropTypes.string,

  feeAction: PropTypes.shape({
    loadFee: PropTypes.func
  }),
  userLookUpActions: PropTypes.shape({
    lookUp: PropTypes.func,
    update: PropTypes.func
  }),

  onSubmit: PropTypes.func,
  queryParams: PropTypes.shape({
    asset: PropTypes.string.isRequied
  }),
  formState: PropTypes.shape({
    asset: AssetObject,
    amount: PropTypes.string,
    feeAsset: AssetObject,
    username: PropTypes.string,
    memo: PropTypes.string
  })
};
