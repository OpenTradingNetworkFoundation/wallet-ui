import PropTypes from 'prop-types';

import OpenOrder from 'props/OpenOrder';

export const propTypes = {
  orders: PropTypes.arrayOf(OpenOrder)
};
