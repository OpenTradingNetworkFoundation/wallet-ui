import PropTypes from 'prop-types';

export const propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  mods: PropTypes.array,
  type: PropTypes.string,
  shouldBeFocused: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  error: PropTypes.string,
  Icon: PropTypes.func,
  value: PropTypes.string,
  mask: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  dataTestId: PropTypes.string
};

export const defaultProps = {
  value: '',
  disabled: false,
  mods: []
};
