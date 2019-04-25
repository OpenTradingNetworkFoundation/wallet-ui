import PropTypes from 'prop-types';

export const propTypes = {
  assetId: PropTypes.string,
  externalHistory: PropTypes.object,

  externalHistoryActions: PropTypes.shape({
    loadHistory: PropTypes.func,
    updateHistory: PropTypes.func
  })
};
