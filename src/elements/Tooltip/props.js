import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';

export const propTypes = {
  ...Tooltip.propTypes,
  renderTooltip: PropTypes.func,
  renderTitle: PropTypes.func,
  mods: PropTypes.arrayOf(PropTypes.string),
  contentClassName: PropTypes.string
};

export const defaultProps = {
  ...Tooltip.defaultProps,
  renderTooltip: () => null,
  renderTitle: () => null,
  mods: ['white'],
  position: 'top'
};
