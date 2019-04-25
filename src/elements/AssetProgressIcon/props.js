import PropTypes from 'prop-types';

import Operation from 'props/Operation';

export const propTypes = {
  operations: PropTypes.arrayOf(
    PropTypes.shape({
      ...Operation
    })
  ),
  id: PropTypes.string,
  className: PropTypes.string
};
