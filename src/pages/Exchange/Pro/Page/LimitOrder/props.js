import PropTypes from 'prop-types';

export const propTypes = {
  base: PropTypes.object.isRequired,
  quote: PropTypes.object.isRequired,
  fee: PropTypes.string,

  exchangeActions: PropTypes.shape({
    placeOrder: PropTypes.func,
    loadFee: PropTypes.func
  }).isRequired,
  balanceActions: PropTypes.shape({
    loadBalance: PropTypes.func
  }).isRequired
};
