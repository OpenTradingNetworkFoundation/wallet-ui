import PropTypes from 'prop-types';
import { DIRECTION } from 'pages/Exchange/Pro/Page/constants/orderBookDirection';

export const propTypes = {
  direction: PropTypes.oneOf([DIRECTION.NORMAL, DIRECTION.REVERSE]).isRequired,
  toggleDirection: PropTypes.func.isRequired
};
