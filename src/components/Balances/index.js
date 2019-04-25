import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ChainStore } from 'bitsharesjs';

import { balanceSelectors, balanceActions } from 'ducks/balance';
import { externalHistoryActions } from 'ducks/history/external';

import { propTypes } from './props';

class Balances extends React.Component {
  static propTypes = propTypes;

  componentDidMount() {
    const { externalHistoryActions, balanceActions } = this.props;

    externalHistoryActions.loadHistory();
    ChainStore.subscribe(balanceActions.loadBalance);
    ChainStore.subscribe(externalHistoryActions.loadHistory);
  }

  componentWillUnmount() {
    const { externalHistoryActions, balanceActions } = this.props;

    ChainStore.unsubscribe(balanceActions.loadBalance);
    ChainStore.unsubscribe(externalHistoryActions.loadHistory);
  }

  render() {
    const { balance } = this.props;
    const { otnAsset, tokenizedAssets } = balance;

    return this.props.children(otnAsset, tokenizedAssets);
  }
}

export default connect(
  state => ({
    balance: {
      otnAsset: balanceSelectors.core(state),
      tokenizedAssets: balanceSelectors.notEmptyTokenizedWithPending(state),
      isFetching: state.balance.isFetching
    }
  }),
  dispatch => ({
    balanceActions: bindActionCreators(balanceActions, dispatch),
    externalHistoryActions: {
      loadHistory: bindActionCreators(
        externalHistoryActions.loadHistory,
        dispatch
      )
    }
  })
)(Balances);
