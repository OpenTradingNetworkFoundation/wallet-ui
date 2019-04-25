import React from 'react';
import { Switch } from 'react-router-dom';

import Route from 'elements/Route';
import Url from 'elements/Url';
import ErrorBoundary from 'components/ErrorBoundary';

import Balances from 'components/Balances';
import Asset from 'components/Asset';
import TokenizedAssetsList from 'components/TokenizedAssetsList';

import SendPage from 'pages/Send/Page';
import TokenizePage from 'pages/Tokenize/Page';
import DetokenizePage from 'pages/Detokenize/Page';
import ReceivePage from 'pages/Receive/Page';

import localizer from 'utils/localizer';
import URL from 'enums/url';
import { ERROR, SERVICE } from 'enums/serviceStatus';

import './style.styl';

class WalletPage extends React.Component {
  render() {
    return (
      <ErrorBoundary type={ERROR[500]} required={SERVICE.NODE}>
        <div className="wallet-page">
          <div className="wallet-page-row">
            <span className="wallet-page__page-label">
              {localizer.getValue('page.wallet.walletLabel')}
            </span>
            <Url
              className="wallet-page__otnt-to-otn-link"
              link={{ pathname: URL.TOKENIZE, search: '?asset=OTN' }}
            >
              {localizer.getValue('page.wallet.otnTokenizationUrl')}
            </Url>
          </div>

          <Switch>
            <Route
              exact
              render={() => (
                <Balances>
                  {(otnAsset, tokenizedAssets) => (
                    <React.Fragment>
                      <div className="wallet-page-row">
                        {otnAsset && (
                          <Asset
                            asset={otnAsset}
                            className="wallet-page__otn-asset"
                          />
                        )}
                      </div>
                      <div className="wallet-page-row">
                        <TokenizedAssetsList assets={tokenizedAssets} />
                      </div>
                    </React.Fragment>
                  )}
                </Balances>
              )}
              path={URL.WALLET}
            />
            <Route
              check={{ password: true }}
              exact
              path={URL.SEND}
              component={SendPage}
            />

            <Route
              exact
              path={URL.RECEIVE}
              component={ReceivePage}
              check={{ password: true }}
            />

            <Route
              check={{ password: true }}
              exact
              path={URL.TOKENIZE}
              component={TokenizePage}
            />

            <Route
              check={{ password: true }}
              exact
              path={URL.DETOKENIZE}
              component={DetokenizePage}
            />
          </Switch>
        </div>
      </ErrorBoundary>
    );
  }
}

export default WalletPage;
