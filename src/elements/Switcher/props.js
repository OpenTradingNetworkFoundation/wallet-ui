import PropTypes from 'prop-types';

import Mods from 'props/mods';

export const propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  mods: Mods,
  active: PropTypes.bool
};

export const defaultProps = {
  mods: [],
  active: false
};
