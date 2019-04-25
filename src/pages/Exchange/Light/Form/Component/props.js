import PropTypes from 'prop-types';

import Asset from 'props/AssetObject';

export const propTypes = {
  onFromAssetChange: PropTypes.func,
  onToAssetChange: PropTypes.func,
  onFromAmountChange: PropTypes.func,
  onMaxClick: PropTypes.func,
  onToAmountChange: PropTypes.func,
  onFeeAssetChange: PropTypes.func,
  onFormSubmit: PropTypes.func,
  onExchangeAssets: PropTypes.func,

  fields: PropTypes.shape({
    toAsset: Asset,
    fromAsset: Asset,
    fromAmount: PropTypes.string,
    toAmount: PropTypes.string,
    feeAsset: Asset
  }),

  validation: PropTypes.shape({
    fromAmount: PropTypes.string,
    toAmount: PropTypes.string,
    invalid: PropTypes.bool
  }),

  meta: PropTypes.shape({
    fromMaxAmount: PropTypes.string
  }),

  data: PropTypes.shape({
    priceMeta: PropTypes.shape({
      price: PropTypes.string,
      isAvailable: PropTypes.bool
    }),
    fee: PropTypes.shape({
      isLoading: PropTypes.bool,
      feeAmount: PropTypes.string
    }),
    availableBalances: PropTypes.arrayOf(Asset),
    exchangeScheme: PropTypes.object
  })
};
