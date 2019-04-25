import PropTypes from 'prop-types';

import AssetObject from 'props/AssetObject';

export const propTypes = {
  hasBalances: PropTypes.bool,
  notEmptyNames: PropTypes.arrayOf(PropTypes.string),
  hasTokenized: PropTypes.bool,
  tokenized: PropTypes.arrayOf(AssetObject),

  exchangeAction: PropTypes.shape({
    loadFee: PropTypes.func
  })
};
