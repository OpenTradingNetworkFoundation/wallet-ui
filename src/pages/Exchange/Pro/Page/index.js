import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ChainStore } from 'bitsharesjs';

import { interfaceModeActions } from 'ducks/interface-mode';
import EXCHANGE_MODE from 'enums/exchangeMode';

import Menu from 'pages/Exchange/Pro/Page/Menu';
import ViewArea from 'pages/Exchange/Pro/Page/ViewArea';
import Panel from 'pages/Exchange/Pro/Page/Panel';
import { ACTIVE_MENU_ITEM } from 'pages/Exchange/Pro/Page/constants/activeMenuItem';
import { accountSelectors } from 'ducks/account';
import OpenOrdersProvider, {
  Consumer as OpenOrdersConsumer
} from 'src/providers/OpenOrders';

import { propTypes } from 'pages/Exchange/Pro/Page/props';
import { ExchangeProPage } from 'pages/Exchange/Pro/Page/styled';

class Page extends React.Component {
  static propTypes = propTypes;

  state = {
    activeMenuItem: ACTIVE_MENU_ITEM.NONE
  };

  componentDidMount() {
    const { updateInterfaceMode } = this.props;
    updateInterfaceMode(EXCHANGE_MODE.PRO);

    this.loadOrders();
    ChainStore.subscribe(this.loadOrders);
  }

  componentWillUnmount() {
    const { updateInterfaceMode } = this.props;
    updateInterfaceMode(EXCHANGE_MODE.LIGHT);

    ChainStore.unsubscribe(this.loadOrders);
  }

  loadOrders = () => {
    const { accountId, loadOrders } = this.props;
    loadOrders(accountId);
  };

  render() {
    return (
      <ExchangeProPage>
        <ViewArea />
        <Panel activeMenuItem={this.state.activeMenuItem} />
        <Menu
          setActiveMenuItem={activeItem =>
            this.setState(state => ({
              activeMenuItem:
                state.activeMenuItem === activeItem
                  ? ACTIVE_MENU_ITEM.NONE
                  : activeItem
            }))
          }
          activeMenuItem={this.state.activeMenuItem}
        />
      </ExchangeProPage>
    );
  }
}

export default connect(
  state => ({
    accountId: accountSelectors.accountId(state)
  }),
  dispatch => ({
    updateInterfaceMode: bindActionCreators(
      interfaceModeActions.updateInterfaceMode,
      dispatch
    )
  })
)(props => (
  <OpenOrdersProvider>
    <OpenOrdersConsumer>
      {({ loadOrders }) => <Page {...props} loadOrders={loadOrders} />}
    </OpenOrdersConsumer>
  </OpenOrdersProvider>
));
