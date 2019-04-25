import PropTypes from 'prop-types';
import AssetObject from 'props/AssetObject';

export const propTypes = {
  asset: AssetObject.isRequired,
  feeAsset: AssetObject.isRequired,

  amount: PropTypes.string.isRequired,
  feeAmount: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,

  onConfirm: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};
