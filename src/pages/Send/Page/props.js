import PropTypes from 'prop-types';
import AssetObject from 'props/AssetObject';

export const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),

  availableAssets: PropTypes.arrayOf(AssetObject)
};
