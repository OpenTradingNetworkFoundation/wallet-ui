import PropTypes from 'prop-types';

export const propTypes = {
  balanceActions: PropTypes.shape({
    loadBalance: PropTypes.func
  }),
  internalHistoryActions: PropTypes.shape({
    updateHistory: PropTypes.func,
    loadHistory: PropTypes.func
  }),
  gatewayActions: PropTypes.shape({
    getInfo: PropTypes.func
  }),
  isPro: PropTypes.bool
};
