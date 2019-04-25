import PropTypes from 'prop-types';

import { propTypes as inputProps } from 'elements/Input/props';

export const propTypes = {
  className: PropTypes.string,
  inputProps: PropTypes.shape(inputProps),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  onLabelClick: PropTypes.func
};
