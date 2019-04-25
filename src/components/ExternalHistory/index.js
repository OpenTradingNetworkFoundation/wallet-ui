import React from 'react';

import { ChainStore } from 'bitsharesjs';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import History from 'components/History';
import EmptyPlaceholder from 'components/EmptyPlaceholder';
import ErrorBoundary from 'components/ErrorBoundary';
import Translate from 'elements/Translate';
import { SERVICE, ERROR } from 'enums/serviceStatus';
import translate from 'services/translate';

import {
  externalHistoryActions,
  externalHistorySelectors
} from 'ducks/history/external';

import cn from 'utils/bem';

import OperationDetails from './OperationDetails';

import { propTypes } from './props';
import './style.styl';

const b = cn('external-history');

class ExternalHistory extends React.Component {
  static propTypes = propTypes;

  componentDidMount() {
    const { externalHistoryActions } = this.props;
    externalHistoryActions.loadHistory();
    ChainStore.subscribe(this.updateHistory);
  }

  componentWillUnmount() {
    ChainStore.unsubscribe(this.updateHistory);
  }

  updateHistory = () => {
    const { externalHistoryActions } = this.props;
    externalHistoryActions.loadHistory();
  };

  render() {
    const { operations } = this.props;
    return (
      <ErrorBoundary
        required={SERVICE.GATEWAY}
        type={ERROR[500]}
        renderStatus={() => (
          <Translate path="component.History.external.error.status" />
        )}
        renderTitle={() => (
          <Translate path="component.History.external.error.title" />
        )}
        renderDescription={() => (
          <Translate path="component.History.external.error.description" />
        )}
      >
        {operations.length ? (
          <React.Fragment>
            <header className={b('table-head', null, 'flex-table-head')}>
              <span className={b('date', null, 'flex-th')}>Date</span>
              <span className={b('asset', null, 'flex-th')}>Asset</span>
              <span className={b('type', null, 'flex-th')}>Type</span>
              <span className={b('amount', null, 'flex-th')}>Amount</span>
            </header>
            <History
              title={translate('component.History.external.label')}
              operations={operations}
              renderAsset
              renderOperationDetails={operation => (
                <OperationDetails operation={operation} />
              )}
            />
          </React.Fragment>
        ) : (
          <EmptyPlaceholder
            title={translate('page.history.empty.title')}
            description={translate('page.history.empty.description')}
          />
        )}
      </ErrorBoundary>
    );
  }
}

export default connect(
  state => ({
    operations: externalHistorySelectors.operations(state)
  }),
  dispatch => ({
    externalHistoryActions: {
      loadHistory: bindActionCreators(
        externalHistoryActions.loadHistory,
        dispatch
      )
    }
  })
)(ExternalHistory);
