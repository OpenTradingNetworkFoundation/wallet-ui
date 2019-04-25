import PropTypes from 'prop-types';
import AssetObject from 'props/AssetObject';

export const propTypes = {
  availableAssets: PropTypes.arrayOf(AssetObject),
  feeAssets: PropTypes.arrayOf(AssetObject),
  hasBalances: PropTypes.bool,
  notEmptyNames: PropTypes.arrayOf(PropTypes.string),

  gatewayActions: PropTypes.shape({
    getInfo: PropTypes.func
  }),
  feeActions: PropTypes.shape({
    loadGatewayFee: PropTypes.func
  }),
  detokenizeActions: PropTypes.shape({
    detokenize: PropTypes.func
  })
};
