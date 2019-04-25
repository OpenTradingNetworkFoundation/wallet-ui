import PropTypes from 'prop-types';

import routeProps from 'props/route';
import AssetObject from 'props/AssetObject';

export const propTypes = {
  ...routeProps,
  asset: AssetObject,
  className: PropTypes.string
};
