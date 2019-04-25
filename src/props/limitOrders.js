import PropTypes from 'prop-types';

export const order = PropTypes.shape({
  quote: PropTypes.string,
  base: PropTypes.string,
  price: PropTypes.string
});

export const LimitOrders = PropTypes.shape({
  asks: PropTypes.arrayOf(order),
  bids: PropTypes.arrayOf(order)
});
