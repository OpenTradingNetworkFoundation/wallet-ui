import React from 'react';

import ExternalHistory from 'components/ExternalHistory';
import Select from 'react-select';

import cn from 'utils/bem';
import localizer from 'utils/localizer';

import InternalHistory from 'components/InternalHistory';
import ArrowDownIcon from 'icons/arrow-down.svg';
import './style.styl';

const b = cn('history-page');

const DISPLAY_MODE = {
  INTERNAL: { value: 'internal' },
  EXTERNAL: { value: 'external' }
};

class HistoryPage extends React.Component {
  state = {
    displayMode: DISPLAY_MODE.EXTERNAL
  };

  handleFilterChange = filter => value => {
    this.setState({ [filter]: value });
  };

  renderValue = type => option => (
    <React.Fragment>
      <span>{localizer.getValue(['page', 'history', type, option.value])}</span>
      <ArrowDownIcon className={b('arrow')} />
    </React.Fragment>
  );

  renderOption = type => option => (
    <span>{localizer.getValue(['page', 'history', type, option.value])}</span>
  );

  render() {
    return (
      <main className={b()}>
        <header className={b('header')}>
          {localizer.getValue('page.history.label')}
        </header>
        <section className={b('filters')}>
          <Select
            className={b('filter', null, 'dropdown')}
            clearable={false}
            multi={false}
            searchable={false}
            optionRenderer={this.renderOption('displayMode')}
            valueRenderer={this.renderValue('displayMode')}
            options={Object.values(DISPLAY_MODE)}
            value={this.state.displayMode}
            onChange={this.handleFilterChange('displayMode')}
          />
        </section>
        <section className={b('content')}>
          {this.state.displayMode.value === 'external' ? (
            <ExternalHistory />
          ) : (
            <InternalHistory />
          )}
        </section>
      </main>
    );
  }
}

export default HistoryPage;
