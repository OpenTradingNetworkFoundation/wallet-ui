import PropTypes from 'prop-types';
import AssetObject from 'props/AssetObject';

export const propTypes = {
  balance: PropTypes.shape({
    otnAsset: AssetObject,
    isFetching: PropTypes.bool,
    tokenizedAssets: PropTypes.arrayOf(AssetObject)
  }),
  balanceActions: PropTypes.shape({
    loadBalance: PropTypes.func
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  children: PropTypes.func.isRequired
};
