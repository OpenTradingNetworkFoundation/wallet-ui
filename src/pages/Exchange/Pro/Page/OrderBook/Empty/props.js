import PropTypes from 'prop-types';

import ORDER_BOOK_TYPE from 'pages/Exchange/Pro/Page/constants/orderBookType';

export const propTypes = {
  type: PropTypes.oneOf(Object.values(ORDER_BOOK_TYPE))
};
