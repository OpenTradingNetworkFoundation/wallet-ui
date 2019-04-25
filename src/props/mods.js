import PropTypes from 'prop-types';

const Mods = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.string),
  PropTypes.string,
  PropTypes.object
]);

export default Mods;
