import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { balanceSelectors } from 'ducks/balance';
import EmptyPlaceholder from 'components/EmptyPlaceholder';
import QueryParams from 'components/QueryParams';
import translate from 'services/translate';
import { exchangeFundsActions } from 'ducks/exchange-funds';
import AssetAmount from 'src/models/AssetAmount';
import withRouter from 'hocs/withRouter';

import URL from 'enums/url';
import { ASSET } from 'enums/asset';

import Form from '../Form';

import { propTypes } from './props';

class ExchangePage extends React.Component {
  static propTypes = propTypes;

  state = {
    form: null
  };

  onSubmit = formState => {
    this.setState({ ...this.state, form: formState }, this.exchange);
  };

  exchange = () => {
    const { exchange } = this.props.exchangeAction;
    exchange(this.getExchangeParams(this.state.form));

    const { routerActions, location } = this.props;
    routerActions.navigate({ pathname: URL.WALLET, from: location });
  };

  getExchangeParams = formData => {
    const { feeAsset, fromAsset, toAsset, fromAmount, toAmount } = formData;

    return {
      feeAssetId: feeAsset.id,
      from: {
        amount: AssetAmount.normalize(fromAmount, fromAsset.precision),
        assetId: fromAsset.id
      },
      to: {
        amount: AssetAmount.normalize(toAmount, toAsset.precision),
        assetId: toAsset.id
      }
    };
  };

  render() {
    const { hasBalances, notEmptyNames, hasTokenized, tokenized } = this.props;

    const defaultAsset = hasTokenized ? tokenized[0].displayName : ASSET.OTN;

    return (
      <React.Fragment>
        {hasBalances ? (
          <QueryParams
            params={{
              asset: {
                values: notEmptyNames,
                default: defaultAsset
              }
            }}
            render={queryParams => (
              <Form
                queryParams={queryParams}
                formState={this.state.form}
                onSubmit={this.onSubmit}
                getExchangeParams={this.getExchangeParams}
              />
            )}
          />
        ) : (
          <EmptyPlaceholder
            title={translate('page.exchange.empty.title')}
            description={translate('page.exchange.empty.description')}
          />
        )}
      </React.Fragment>
    );
  }
}

export default compose(
  withRouter,
  connect(
    state => ({
      hasBalances: balanceSelectors.hasBalances(state),
      notEmptyNames: balanceSelectors.notEmptyNames(state),
      hasTokenized: balanceSelectors.hasNotEmptyTokenized(state),
      tokenized: balanceSelectors.notEmptyTokenized(state)
    }),
    dispatch => ({
      exchangeAction: {
        exchange: bindActionCreators(
          exchangeFundsActions.exchangeFunds,
          dispatch
        )
      }
    })
  )
)(ExchangePage);
