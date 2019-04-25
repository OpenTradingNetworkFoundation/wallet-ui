import PropTypes from 'prop-types';
import AssetObject from 'props/AssetObject';

export const propTypes = {
  assets: PropTypes.arrayOf(AssetObject),
  onChangeAsset: PropTypes.func,
  selectedFeeAsset: AssetObject,
  feeAmount: PropTypes.string,
  amount: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  showDetails: PropTypes.bool,
  showPercentages: PropTypes.bool,
  showDropdown: PropTypes.bool,
  feeLabel: PropTypes.string
};

export const defaultProps = {
  showDropdown: true,
  showDetails: false
};
