import React from 'react';
import memoizeOne from 'memoize-one';
import PropTypes from 'prop-types';
import { compose as composeRedux } from 'redux';
import { connect } from 'react-redux';
import { compose, prop } from 'ramda';

import { getAllOpenOrders, closeOrder } from 'api/ordersApi';
import Children from 'props/Children';
import withCallIfMounted from 'hocs/withCallIfMounted';
import { accountSelectors } from 'src/ducks/account';
import { authSelectors } from 'src/ducks/auth';
import { balanceSelectors } from 'src/ducks/balance';

import { orderCount, orders } from './selectors';

const { Consumer, Provider } = React.createContext();

const getPublicKey = compose(prop('active'), accountSelectors.publicKeys);

class OpenOrders extends React.PureComponent {
  state = {
    accountId: '',
    orders: []
  };

  loadOrders = async accountId => {
    const orders = await getAllOpenOrders(accountId);

    this.props.callIfMounted(() => {
      this.setState({
        accountId,
        orders
      });
    });
  };

  closeOrder = accountId => async order => {
    const { privateKey, publicKey } = this.props;
    await closeOrder(order, accountId, { privateKey, publicKey });
  };

  getValue = memoizeOne(state => ({
    orderCount: orderCount(state),
    orders: orders(state, this.props.balancesMap),

    loadOrders: this.loadOrders,
    closeOrder: this.closeOrder
  }));

  render() {
    const { children } = this.props;

    return <Provider value={this.getValue(this.state)}>{children}</Provider>;
  }
}

OpenOrders.propTypes = {
  children: Children,
  callIfMounted: PropTypes.func,
  balancesMap: PropTypes.object,
  publicKey: PropTypes.string,
  privateKey: PropTypes.object
};

export { Consumer, Provider };

export default composeRedux(
  connect(state => ({
    balancesMap: balanceSelectors.balancesMap(state),
    privateKey: authSelectors.getToken(state),
    publicKey: getPublicKey(state)
  })),
  withCallIfMounted
)(OpenOrders);
