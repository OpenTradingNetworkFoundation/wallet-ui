import PropTypes from 'prop-types';

const Truncated = ({ value, children, maxLength, tail }) => {
  const shouldTruncate = value.length > maxLength;
  const truncated = shouldTruncate
    ? value.slice(0, maxLength - tail.length) + tail
    : value;

  return children(truncated, shouldTruncate);
};

Truncated.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,
  tail: PropTypes.string.isRequired
};

Truncated.defaultProps = {
  tail: '...'
};

export default Truncated;
