import PropTypes from 'prop-types';

export const propTypes = {
  accountName: PropTypes.string,
  small: PropTypes.bool,
  hidden: PropTypes.bool,
  id: PropTypes.string
};

export const defaultProps = {
  small: false,
  hidden: false
};
