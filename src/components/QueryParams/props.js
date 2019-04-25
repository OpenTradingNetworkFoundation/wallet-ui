import PropTypes from 'prop-types';

export const propTypes = {
  params: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
  queryParams: PropTypes.object,

  routerActions: PropTypes.shape({
    navigate: PropTypes.func
  })
};
