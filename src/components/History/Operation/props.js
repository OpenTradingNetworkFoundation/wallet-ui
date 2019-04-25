import PropTypes from 'prop-types';

const Asset = PropTypes.shape({
  displayName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  precision: PropTypes.number.isRequired
});

export const propTypes = {
  timeCreated: PropTypes.string,
  state: PropTypes.string,
  type: PropTypes.string,
  amount: PropTypes.shape({
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    asset: Asset
  }),
  precision: PropTypes.number,
  confirmations: PropTypes.number,
  fee: PropTypes.shape({
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    asset: Asset
  }),
  internalType: PropTypes.string,
  internalState: PropTypes.string,
  transactionId: PropTypes.string,
  to: PropTypes.string,
  disableDetails: PropTypes.bool,
  renderAsset: PropTypes.bool,
  className: PropTypes.string
};
