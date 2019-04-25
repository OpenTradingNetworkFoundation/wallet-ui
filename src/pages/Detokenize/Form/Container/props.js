import PropTypes from 'prop-types';

import Asset from 'props/AssetObject';

const formState = {
  asset: Asset,
  feeAsset: Asset,
  amount: PropTypes.string,
  address: PropTypes.string
};

export const propTypes = {
  onSubmit: PropTypes.func,
  defaultFormState: PropTypes.shape(formState),
  availableAssets: PropTypes.arrayOf(Asset),
  feeAssets: PropTypes.arrayOf(Asset),
  queryParams: PropTypes.shape({
    asset: PropTypes.string
  }),
  supportedAssetsById: PropTypes.object
};
