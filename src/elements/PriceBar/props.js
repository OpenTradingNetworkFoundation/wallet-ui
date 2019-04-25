import PropTypes from 'prop-types';

export const propTypes = {
  price: PropTypes.string,
  isLoading: PropTypes.bool,
  isAvailable: PropTypes.bool,
  fromAssetName: PropTypes.string,
  toAssetName: PropTypes.string,
  className: PropTypes.string
};

export const defaultProps = {
  price: '-',
  isAvailable: false
};
