import PropTypes from 'prop-types';
import AssetObject from 'props/AssetObject';

export const propTypes = {
  accountName: PropTypes.string,
  data: PropTypes.shape({
    feeAmount: PropTypes.string,
    asset: AssetObject,
    amount: PropTypes.string,
    feeAsset: AssetObject,
    username: PropTypes.string
  }),
  onConfirm: PropTypes.func,
  onBack: PropTypes.func
};
