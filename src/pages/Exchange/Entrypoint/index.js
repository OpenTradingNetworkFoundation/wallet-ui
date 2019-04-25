import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Switch } from 'react-router-dom';

import {
  interfaceModeActions,
  interfaceModeSelectors
} from 'src/ducks/interface-mode';
import withRouter from 'hocs/withRouter';
import URL from 'src/enums/url';
import Route from 'src/elements/Route';
import EXCHANGE_MODE from 'enums/exchangeMode';

import cn from 'utils/bem';
import Translate from 'elements/Translate';
import Switcher from 'elements/Switcher';
import { isProExchangeMode, saveExchangeMode } from 'services/exchangeMode';

import ExchangeLight from '../Light/Page';
import ExchangePro from '../Pro/Page';

import { propTypes } from './props';

import './style.styl';

const b = cn('exchange-entrypoint');

class ExchangeEntrypoint extends React.Component {
  static propTypes = propTypes;

  onModeChange = isPro => {
    const { updateInterfaceMode } = this.props;
    updateInterfaceMode(isPro ? EXCHANGE_MODE.PRO : EXCHANGE_MODE.LIGHT);

    const { routerActions, location } = this.props;

    routerActions.navigate({
      pathname: isPro ? URL.EXCHANGE_PRO : URL.EXCHANGE,
      from: location
    });

    saveExchangeMode(isPro);
  };

  componentWillMount() {
    const { isPro } = this.props;
    const isProSavedMode = isProExchangeMode();

    if (isPro !== isProSavedMode) {
      this.onModeChange(!isPro);
    }
  }

  render() {
    const { isPro } = this.props;

    return (
      <div className={b()}>
        <div className={b('header')}>
          <span className={b('label-container')}>
            <Translate
              path="page.exchange.label"
              className={b('page-label', { pro: isPro })}
            />
            {isPro && (
              <Translate
                path="page.exchangeEntrypoint.pro"
                className={b('pro-icon')}
              />
            )}
          </span>
          <Switcher
            className={b('switcher')}
            active={isPro}
            mods={{
              dark: isPro
            }}
            onChange={this.onModeChange}
          />
        </div>

        <Switch>
          <Route
            exact
            check={{ password: true }}
            path={URL.EXCHANGE}
            component={ExchangeLight}
          />
          <Route
            exact
            check={{ password: true }}
            path={URL.EXCHANGE_PRO}
            component={ExchangePro}
          />
        </Switch>
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(
    state => ({
      isPro: interfaceModeSelectors.isPro(state)
    }),
    dispatch => ({
      updateInterfaceMode: bindActionCreators(
        interfaceModeActions.updateInterfaceMode,
        dispatch
      )
    })
  )
)(ExchangeEntrypoint);
