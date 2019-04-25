import PropTypes from 'prop-types';

import RouteProps from 'props/route';

export const propTypes = {
  ...RouteProps,
  title: PropTypes.string,
  description: PropTypes.string
};
