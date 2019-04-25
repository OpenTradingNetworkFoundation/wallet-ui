import PropTypes from 'prop-types';

export const propTypes = {
  queryParams: PropTypes.shape({
    asset: PropTypes.string.isRequired
  }),
  accountName: PropTypes.string
};
