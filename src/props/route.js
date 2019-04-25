import PropTypes from 'prop-types';

const route = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  location: PropTypes.object,
  routerActions: PropTypes.shape({
    navigate: PropTypes.func
  })
};

export default route;
