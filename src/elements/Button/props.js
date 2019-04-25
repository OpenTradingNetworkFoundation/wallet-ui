import PropTypes from 'prop-types';
import Mods from 'props/mods';

export const propTypes = {
  className: PropTypes.string,
  mods: Mods,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool
};
