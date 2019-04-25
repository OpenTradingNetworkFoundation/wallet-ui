import PropTypes from 'prop-types';

import Asset from 'props/AssetObject';

export const propTypes = {
  balances: PropTypes.shape({
    all: PropTypes.arrayOf(Asset),
    tokenized: PropTypes.arrayOf(Asset),
    avaiable: PropTypes.arrayOf(Asset)
  }),
  fee: PropTypes.shape({
    isLoading: PropTypes.bool,
    feeAmount: PropTypes.string
  }),
  priceMeta: PropTypes.shape({
    price: PropTypes.string,
    fromAssetName: PropTypes.string,
    toAssetName: PropTypes.string,
    isLoading: PropTypes.bool,
    isAvailable: PropTypes.bool
  }),
  queryParams: PropTypes.shape({
    asset: PropTypes.string
  }),

  formState: PropTypes.shape({
    fromAsset: Asset,
    toAsset: Asset,
    feeAsset: Asset,
    fromAmount: PropTypes.string,
    toAmount: PropTypes.string
  }),

  onSubmit: PropTypes.func,
  getExchangeParams: PropTypes.func,

  exchangeAction: PropTypes.shape({
    loadFee: PropTypes.func
  }),
  priceAction: PropTypes.shape({
    getPrice: PropTypes.func
  }),
  orderBookActions: PropTypes.shape({
    requestOrderBook: PropTypes.func
  })
};
