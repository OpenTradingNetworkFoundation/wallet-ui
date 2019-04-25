import PropTypes from 'prop-types';

export const propTypes = {
  payload: PropTypes.shape({
    message: PropTypes.string,
    body: PropTypes.shape({
      pays: PropTypes.shape({
        amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        assetId: PropTypes.string
      }),
      receives: PropTypes.shape({
        amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        assetId: PropTypes.string
      }),
      amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      assetId: PropTypes.string
    })
  }),
  balances: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      displayName: PropTypes.string
    })
  )
};
