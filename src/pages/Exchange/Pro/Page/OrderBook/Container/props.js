import PropTypes from 'prop-types';

import { LimitOrders } from 'props/limitOrders';

export const propTypes = {
  currentlySelectedItem: PropTypes.shape({
    base: PropTypes.string,
    quote: PropTypes.string
  }),
  averagePrice: PropTypes.string,
  orderBook: LimitOrders,

  selectOrder: PropTypes.func
};
