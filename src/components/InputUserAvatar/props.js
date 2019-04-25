import PropTypes from 'prop-types';

import { propTypes as inputProps } from 'elements/Input/props';

export const propTypes = {
  className: PropTypes.string,
  inputProps: PropTypes.shape(inputProps),
  isLoading: PropTypes.bool
};
