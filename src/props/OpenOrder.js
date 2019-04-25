import PropTypes from 'prop-types';

const Asset = PropTypes.shape({
  name: PropTypes.string,
  displayAmount: PropTypes.string
});

const OpenOrder = PropTypes.shape({
  base: Asset,
  quote: Asset,
  expiration: PropTypes.string,
  price: PropTypes.string,
  percentage: PropTypes.number,
  type: PropTypes.string
});

export default OpenOrder;
