import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import QueryParams from 'components/QueryParams';

import { ASSET } from 'enums/asset';
import { SERVICE, ERROR } from 'enums/serviceStatus';

import { gatewaySelectors } from 'ducks/gateway';
import { balanceSelectors } from 'ducks/balance';
import { errorHandlerActions } from 'ducks/errorHandler';

import ErrorBoundary from 'components/ErrorBoundary';

import Form from '../Form';

import { propTypes } from './props';

class TokenizePage extends React.Component {
  static propTypes = propTypes;

  render() {
    const props = this.props;

    return (
      <ErrorBoundary required={SERVICE.GATEWAY} type={ERROR[SERVICE.GATEWAY]}>
        <QueryParams
          params={{
            asset: {
              values: props.assets.map(asset => asset.asset),
              default: ASSET.OTN
            }
          }}
          render={queryParams =>
            props.assets.length ? (
              <Form queryParams={queryParams} assets={props.assets} />
            ) : null
          }
        />
      </ErrorBoundary>
    );
  }
}

export default connect(
  state => ({
    assets: gatewaySelectors.supportedAssets(state, balanceSelectors.native)
  }),
  dispatch => ({
    errorHandlerActions: {
      handleError: bindActionCreators(errorHandlerActions.handleError, dispatch)
    }
  })
)(TokenizePage);
