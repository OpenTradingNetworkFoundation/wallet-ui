import PropTypes from 'prop-types';

export const propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      displayName: PropTypes.string,
      amount: PropTypes.number
    })
  )
};
