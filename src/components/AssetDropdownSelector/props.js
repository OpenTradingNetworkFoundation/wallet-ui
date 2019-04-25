import PropTypes from 'prop-types';
import AssetObject from 'props/AssetObject';

export const propTypes = {
  assets: PropTypes.arrayOf(AssetObject),
  onChange: PropTypes.func,
  selectedAsset: AssetObject,
  label: PropTypes.string,
  className: PropTypes.string,
  showAmount: PropTypes.bool,
  mods: PropTypes.arrayOf(PropTypes.string)
};

export const defaultProps = {
  showAmount: true
};
