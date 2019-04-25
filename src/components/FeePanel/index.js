import React from 'react';

import AssetAmount from 'src/models/AssetAmount';
import AssetDropdownSelector from 'components/AssetDropdownSelector';
import Spinner from 'elements/Spinner';
import { ASSET_ICON } from 'enums/asset';
import cn from 'utils/bem';
import localizer from 'utils/localizer';
import FeePercentage from 'elements/FeePercentage';

import { propTypes, defaultProps } from './props';

import './style.styl';

const b = cn('fee-panel');

class FeePanel extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  _renderAmount = () => {
    const { feeAmount, selectedFeeAsset, isLoading } = this.props;
    const { asset, isTokenized, precision } = selectedFeeAsset;

    const Icon = ASSET_ICON[asset];
    const assetName = isTokenized ? `OTN.${asset}` : asset;
    const parsedAmount = AssetAmount.parse(feeAmount, precision);

    return (
      <div className={b('fee')}>
        <Icon className={b('icon')} />
        <span className={b('fee-value')}>
          {isLoading ? <Spinner className={b('spinner')} /> : parsedAmount}{' '}
          {assetName}
        </span>
      </div>
    );
  };

  _renderPercentages = () => {
    const {
      amount,
      feeAmount,
      selectedFeeAsset,
      isLoading,
      showPercentages,
      feeLabel
    } = this.props;
    const { precision } = selectedFeeAsset;

    const normalizedValue = AssetAmount.normalize(amount, precision);

    return (
      <FeePercentage
        label={feeLabel}
        percentage={feeAmount / normalizedValue}
        showPercentage={Boolean(amount && showPercentages)}
        isLoading={isLoading}
      />
    );
  };

  _renderDetails() {
    const {
      assets,
      selectedFeeAsset,
      onChangeAsset,
      showDropdown
    } = this.props;

    return (
      <div className={b('details')}>
        {this._renderAmount()}
        {showDropdown && (
          <AssetDropdownSelector
            className={b('selector')}
            assets={assets}
            onChange={onChangeAsset}
            selectedAsset={selectedFeeAsset}
            label={localizer.getValue('component.FeePanel.label')}
          />
        )}
      </div>
    );
  }

  render() {
    const { className, showDetails } = this.props;

    return (
      <div className={b(null, null, className)}>
        {this._renderPercentages()}
        {showDetails ? this._renderDetails() : null}
      </div>
    );
  }
}

export default FeePanel;
