import PropTypes from 'prop-types';

export const propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  onClick: PropTypes.func,
  link: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ pathname: PropTypes.string, search: PropTypes.string })
  ]),
  isNative: PropTypes.bool,
  newTab: PropTypes.bool
};

export const defaultProps = {
  isNative: false,
  newTab: false
};
