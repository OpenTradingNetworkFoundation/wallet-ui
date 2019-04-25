import PropTypes from 'prop-types';

const Item = PropTypes.shape({
  id: PropTypes.string
});

export const propTypes = {
  value: Item,
  options: PropTypes.arrayOf(Item),
  onChange: PropTypes.func
};
