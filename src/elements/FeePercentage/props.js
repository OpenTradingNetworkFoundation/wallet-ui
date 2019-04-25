import PropTypes from 'prop-types';

export const propTypes = {
  label: PropTypes.string,
  isLoading: PropTypes.bool,
  percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showPercentage: PropTypes.bool,
  className: PropTypes.string
};
