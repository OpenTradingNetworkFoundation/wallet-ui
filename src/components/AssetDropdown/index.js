import React from 'react';
import Select from 'react-select';

import cn from 'utils/bem';
import { ASSET_ICON } from 'enums/asset';

import { propTypes } from './props';

import './style.styl';

const b = cn('asset-dropdown');

class AssetDropdown extends React.Component {
  static propTypes = propTypes;

  renderItem = (item, pinned) => {
    const { asset, displayName, fullName } = item;
    const { selectedAsset } = this.props;

    const Icon = ASSET_ICON[asset];
    const selected = item.id === selectedAsset.id;

    return (
      <div className={b('item', { pinned })}>
        <span className={b('display-name', { selected })}>{fullName}</span>
        <span className={b('name', { selected })}>{displayName}</span>
        <Icon className={b('icon', { selected })} />
      </div>
    );
  };

  renderOption = item => {
    return this.renderItem(item);
  };

  renderValue = item => {
    return this.renderItem(item, true);
  };

  render() {
    const { assets, onChange, selectedAsset, className } = this.props;

    return (
      <Select
        className={b(null, null, className)}
        clearable={false}
        multi={false}
        searchable={false}
        options={assets}
        onChange={onChange}
        optionRenderer={this.renderOption}
        valueRenderer={this.renderValue}
        value={selectedAsset}
      />
    );
  }
}

export default AssetDropdown;
