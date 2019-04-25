import PropTypes from 'prop-types';

import { order } from 'props/limitOrders';

export const propTypes = {
  orders: PropTypes.arrayOf(order),
  type: PropTypes.string
};
