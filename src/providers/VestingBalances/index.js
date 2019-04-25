import React from 'react';
import PropTypes from 'prop-types';
import { ChainStore } from 'bitsharesjs';

import { connect } from 'react-redux';
import { compose, prop } from 'ramda';
import memoizeOne from 'memoize-one';

import { getVestingBalances, withdrawVestingBalance } from 'api/balanceApi';
import { accountSelectors } from 'src/ducks/account';
import { authSelectors } from 'src/ducks/auth';
import withCallIfMounted from 'hocs/withCallIfMounted';
import Children from 'props/Children';

import { filterEmptyAmount } from './filterEmptyAmount';
import { formattedBalances, hasVestingBalances } from './selectors';

const { Consumer, Provider } = React.createContext();
const getPublicKey = compose(prop('active'), accountSelectors.publicKeys);

class VestingBalances extends React.PureComponent {
  static propTypes = {
    children: Children,
    accountId: PropTypes.string,
    publicKey: PropTypes.string,
    privateKey: PropTypes.object
  };

  state = {
    balances: []
  };

  componentDidMount() {
    this.fetchBalances();
    ChainStore.subscribe(this.fetchBalances);
  }

  componentWillUnmount() {
    ChainStore.unsubscribe(this.fetchBalances);
  }

  fetchBalances = () => {
    const { accountId } = this.props;

    return getVestingBalances(accountId)
      .then(filterEmptyAmount)
      .then(balances => {
        this.setState({
          balances
        });
      });
  };

  handleWithdraw = (balanceId, amount, assetId) => {
    const { publicKey, privateKey, accountId } = this.props;

    return withdrawVestingBalance(
      { accountId, balanceId, amount, assetId },
      { publicKey, privateKey }
    ).then(this.fetchBalances);
  };

  getValue = memoizeOne(state => ({
    balances: formattedBalances(state),
    hasVestingBalances: hasVestingBalances(state),

    fetchBalances: this.fetchBalances,
    withdrawBalance: this.handleWithdraw
  }));

  render() {
    return (
      <Provider value={this.getValue(this.state)}>
        {this.props.children}
      </Provider>
    );
  }
}

export { Consumer, Provider };

export default compose(
  connect(state => ({
    accountId: accountSelectors.accountId(state),
    privateKey: authSelectors.getToken(state),
    publicKey: getPublicKey(state)
  })),
  withCallIfMounted
)(VestingBalances);
