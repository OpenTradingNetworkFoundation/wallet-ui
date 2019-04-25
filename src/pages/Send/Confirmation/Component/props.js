import PropTypes from 'prop-types';

import AssetObject from 'props/AssetObject';

export const propTypes = {
  asset: AssetObject,
  amount: PropTypes.string,
  feeAsset: AssetObject,
  username: PropTypes.string,
  accountName: PropTypes.string,
  feeAmount: PropTypes.string
};
