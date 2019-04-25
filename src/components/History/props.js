import PropTypes from 'prop-types';

export const propTypes = {
  title: PropTypes.string,
  operations: PropTypes.arrayOf(PropTypes.object),
  operationsLimit: PropTypes.number,
  renderAsset: PropTypes.bool,

  disableDetails: PropTypes.bool,

  placeholder: PropTypes.func
};
