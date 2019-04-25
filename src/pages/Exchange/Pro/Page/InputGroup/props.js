import PropTypes from 'prop-types';

export const propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  asset: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  mask: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  dataTestId: PropTypes.string,

  onChange: PropTypes.func
};
