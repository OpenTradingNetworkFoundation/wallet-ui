import PropTypes from 'prop-types';

const Asset = PropTypes.shape({
  amount: PropTypes.string,
  assets: PropTypes.shape({
    displayName: PropTypes.string
  })
});

const Operation = {
  confirmations: PropTypes.number,
  fee: Asset,
  amount: Asset,
  externalTransactionId: PropTypes.string,
  internalTransactionId: PropTypes.string,
  externalAddress: PropTypes.string,
  internalState: PropTypes.string,
  internalType: PropTypes.string
};

export default Operation;
