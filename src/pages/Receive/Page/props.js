import PropTypes from 'prop-types';
import routeProps from 'props/route';

export const propTypes = {
  ...routeProps,
  balanceNames: PropTypes.arrayOf(PropTypes.string),
  accountName: PropTypes.string
};
