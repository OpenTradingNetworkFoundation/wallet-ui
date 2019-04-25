import PropTypes from 'prop-types';

export const propTypes = {
  language: PropTypes.string.isRequired,
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  params: PropTypes.object,
  className: PropTypes.any,
  dataTestId: PropTypes.string
};
