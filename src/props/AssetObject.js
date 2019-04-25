import PropTypes from 'prop-types';

const AssetObject = PropTypes.shape({
  asset: PropTypes.string.isRequired,
  isTokenized: PropTypes.bool.isRequired,
  amount: PropTypes.number,
  displayName: PropTypes.string.isRequired,
  precision: PropTypes.number.isRequired
});

export default AssetObject;
