import PropTypes from 'prop-types';

import { LimitOrders } from 'props/limitOrders';

export const propTypes = {
  averagePrice: PropTypes.string,
  orderBook: LimitOrders
};
