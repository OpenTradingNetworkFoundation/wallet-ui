import PropTypes from 'prop-types';

export const propTypes = {
  currentlySelectedMarket: PropTypes.shape({
    base: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired
  }).isRequired,
  handleItemSelect: PropTypes.func.isRequired,
  supportedAssets: PropTypes.arrayOf(PropTypes.string)
};
