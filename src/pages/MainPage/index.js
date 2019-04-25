import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ChainStore } from 'bitsharesjs';

import URL from 'enums/url';
import Route from 'elements/Route';
import ExchangePage from 'pages/Exchange/Entrypoint';
import WalletPage from 'pages/WalletPage';
import HistoryPage from 'pages/History';
import VestingBalance from 'pages/VestingBalance';

import Sidebar from 'components/Sidebar';
import Toasts from 'components/Toasts';
import { interfaceModeSelectors } from 'src/ducks/interface-mode';
import cn from 'utils/bem';
import HoverContainer from 'elements/HoverContainer';
import ScreenSizeProvider from 'src/providers/ScreenSize';
import VestingBalancesProvider from 'src/providers/VestingBalances';

import { balanceActions } from 'ducks/balance';
import { internalHistoryActions } from 'ducks/history/internal';
import { gatewayActions } from 'ducks/gateway';
import { serviceStatusActions } from 'ducks/serviceStatus';
import { assetsActions } from 'ducks/assets';

import { propTypes } from './props';

import './style.styl';

const b = cn('main-page');

class MainPage extends React.Component {
  static propTypes = propTypes;

  componentDidMount() {
    const {
      balanceActions: { loadBalance },
      internalHistoryActions: { updateHistory, loadHistory },
      serviceStatusActions,
      assetsActions
    } = this.props;
    assetsActions.loadAssets();
    serviceStatusActions.reportGatewayStatus();
    loadBalance();
    loadHistory();
    ChainStore.subscribe(updateHistory);
  }

  componentWillUnmount() {
    const { internalHistoryActions: { updateHistory } } = this.props;

    ChainStore.unsubscribe(updateHistory);
  }

  render() {
    const { isPro } = this.props;

    return (
      <div className={b()}>
        <ScreenSizeProvider>
          <ScreenSizeProvider.Consumer>
            {({ isSmall }) => (
              <React.Fragment>
                <HoverContainer>
                  {hover => {
                    const small = !hover && (isSmall || isPro);
                    return <Sidebar small={small} />;
                  }}
                </HoverContainer>

                <div
                  className={b('display-area', {
                    pro: isPro,
                    small: isSmall || isPro
                  })}
                >
                  <div
                    className={b('content', { pro: isPro })}
                    id="modal-container"
                  >
                    <Switch>
                      <Route
                        exact
                        path={URL.ROOT}
                        component={() => <Redirect to="/wallet" />}
                      />
                      <Route path={URL.WALLET} component={WalletPage} />
                      <Route
                        check={{ password: true }}
                        path={URL.EXCHANGE}
                        component={ExchangePage}
                      />
                      <Route
                        exact
                        check={{ password: true }}
                        path={URL.HISTORY}
                        component={HistoryPage}
                      />
                      <Route
                        check={{ password: true }}
                        path={URL.VESTING_BALANCES}
                        component={VestingBalance}
                      />
                    </Switch>
                  </div>
                </div>
              </React.Fragment>
            )}
          </ScreenSizeProvider.Consumer>
        </ScreenSizeProvider>
        <Toasts className={b('toasts')} />
      </div>
    );
  }
}

export default connect(
  state => ({
    isPro: interfaceModeSelectors.isPro(state)
  }),
  dispatch => ({
    balanceActions: {
      loadBalance: bindActionCreators(balanceActions.loadBalance, dispatch)
    },
    internalHistoryActions: {
      updateHistory: bindActionCreators(
        internalHistoryActions.updateHistory,
        dispatch
      ),
      loadHistory: bindActionCreators(
        internalHistoryActions.loadHistory,
        dispatch
      )
    },
    serviceStatusActions: {
      reportGatewayStatus: bindActionCreators(
        serviceStatusActions.reportGatewayStatus,
        dispatch
      )
    },
    gatewayActions: {
      getInfo: bindActionCreators(gatewayActions.getInfo, dispatch)
    },
    assetsActions: {
      loadAssets: bindActionCreators(assetsActions.loadAssets, dispatch)
    }
  })
)(props => (
  <VestingBalancesProvider>
    <MainPage {...props} />
  </VestingBalancesProvider>
));
