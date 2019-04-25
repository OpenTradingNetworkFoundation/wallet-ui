import PropTypes from 'prop-types';
import AssetObject from 'props/AssetObject';

export const propTypes = {
  assets: PropTypes.arrayOf(AssetObject),
  onChange: PropTypes.func,
  selectedAsset: AssetObject,
  className: PropTypes.string
};
