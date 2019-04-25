import PropTypes from 'prop-types';

import { propTypes as containerProps } from '../Container/props';

export const propTypes = {
  onAssetChange: PropTypes.func,
  onAmountChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onUsernameChange: PropTypes.func,
  onFeeAssetChange: PropTypes.func,
  onMemoChange: PropTypes.func,

  validation: PropTypes.shape({
    amount: PropTypes.string,
    username: PropTypes.string
  }),

  fields: containerProps.formState,

  meta: PropTypes.shape({
    maxAmount: PropTypes.string,
    fee: PropTypes.shape({
      showDetails: PropTypes.bool,
      showPercentages: PropTypes.bool
    }),
    buttonDisabled: PropTypes.bool
  }),

  data: PropTypes.shape({
    availableAssets: containerProps.availableAssets,
    fee: containerProps.fee,
    userLookUp: containerProps.userLookUp
  })
};
