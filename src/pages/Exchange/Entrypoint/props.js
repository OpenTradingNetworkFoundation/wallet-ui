import PropTypes from 'prop-types';

import route from 'props/route';

export const propTypes = {
  ...route,
  isPro: PropTypes.bool,
  updateInterfaceMode: PropTypes.func
};
