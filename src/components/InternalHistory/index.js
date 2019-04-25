import React from 'react';
import { connect } from 'react-redux';

import History from 'components/History';
import EmptyPlaceholder from 'components/EmptyPlaceholder';

import { internalHistorySelectors } from 'ducks/history/internal';

import cn from 'utils/bem';

import localizer from 'utils/localizer';

import OperationDetails from './OperationDetails';

import { propTypes } from './props';
import './style.styl';
const b = cn('internal-history');

class InternalHistory extends React.PureComponent {
  static propTypes = propTypes;

  render() {
    const { operations } = this.props;
    return operations.length ? (
      <section className={b()}>
        <header className={b('table-head', null, 'flex-table-head')}>
          <span className={b('date', null, 'flex-th')}>Block #</span>
          <span className={b('asset', null, 'flex-th')}>Asset</span>
          <span className={b('type', null, 'flex-th')}>Type</span>
          <span className={b('amount', null, 'flex-th')}>Amount</span>
        </header>
        <History
          operations={operations}
          renderAsset
          renderOperationDetails={operation => (
            <OperationDetails operation={operation} />
          )}
        />
      </section>
    ) : (
      <EmptyPlaceholder
        title={localizer.getValue('page.history.empty.title')}
        description={localizer.getValue('page.history.empty.description')}
      />
    );
  }
}

export default connect(state => ({
  operations: internalHistorySelectors.entries(state)
}))(InternalHistory);
