import React from 'react';
import Select from 'react-select';
import AssetAmount from 'src/models/AssetAmount';

import cn from 'utils/bem';
import { ASSET_ICON } from 'enums/asset';

import ArrowDownIcon from 'icons/arrow-down.svg';

import { propTypes, defaultProps } from './props';

import './style.styl';

const b = cn('asset-dropdown-selector');

class AssetDropdownSelector extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  renderOption = item => {
    const { asset, isTokenized, amount = 0, precision } = item;
    const { selectedAsset, showAmount } = this.props;

    const Icon = ASSET_ICON[asset];
    const selected = item.id === selectedAsset.id;
    const assetName = isTokenized ? `OTN.${asset}` : asset;

    return (
      <div className={b('item')}>
        <Icon className={b('icon')} />
        <span className={b('name', { selected })}>{assetName}</span>

        {showAmount ? (
          <span className={b('amount', { selected })}>
            {AssetAmount.parse(amount, precision)}
          </span>
        ) : null}
      </div>
    );
  };

  renderValue = item => {
    const { label, mods = [] } = this.props;
    const { asset, isTokenized } = item;

    const assetName = isTokenized ? `OTN.${asset}` : asset;
    const text = label ? `${label} ${assetName}` : assetName;

    return (
      <div className={b('selected-item', mods)}>
        <span
          className={b('label', {
            'align-start': mods.includes('align-start')
          })}
        >
          {text}
        </span>
        <ArrowDownIcon className={b('arrow-down')} />
      </div>
    );
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

export default AssetDropdownSelector;
