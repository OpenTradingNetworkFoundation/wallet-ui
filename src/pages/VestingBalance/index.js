import React, { Component } from 'react';
import { connect } from 'react-redux';

import { balanceSelectors } from 'ducks/balance';

import Translate from 'elements/Translate';

import { Consumer as VestingBalancesConsumer } from 'src/providers/VestingBalances';

import VestingBalanceItem from './Balance';
import { PageHeader } from './styled';

import { propTypes } from './props';

class VestingBalance extends Component {
  static propTypes = propTypes;

  state = {
    balances: []
  };

  render() {
    const { balancesMap } = this.props;
    return (
      <div>
        <PageHeader>
          <Translate path="page.vestingBalance.label" />
        </PageHeader>
        {this.props.balances.map(balance => {
          const { precision, displayName } = balancesMap[balance.assetId];

          return (
            <VestingBalanceItem
              key={balance.id}
              balance={balance}
              precision={precision}
              displayName={displayName}
              withdrawBalance={this.props.withdrawBalance}
            />
          );
        })}
      </div>
    );
  }
}

export default connect(state => ({
  balancesMap: balanceSelectors.balancesMap(state)
}))(props => (
  <VestingBalancesConsumer>
    {({ withdrawBalance, balances }) => (
      <VestingBalance
        {...props}
        balances={balances}
        withdrawBalance={withdrawBalance}
      />
    )}
  </VestingBalancesConsumer>
));
