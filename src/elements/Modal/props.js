import PropTypes from 'prop-types';

export const propTypes = {
  className: PropTypes.string,
  HeaderContent: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  fadeOutDelay: PropTypes.number
};

export const defaultProps = {
  fadeOutDelay: 400
};
