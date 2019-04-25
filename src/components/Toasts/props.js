import PropTypes from 'prop-types';

export const propTypes = {
  items: PropTypes.array.isRequired,
  toastActions: PropTypes.shape({
    blur: PropTypes.func,
    focus: PropTypes.func,
    itemClose: PropTypes.func
  }).isRequired
};
