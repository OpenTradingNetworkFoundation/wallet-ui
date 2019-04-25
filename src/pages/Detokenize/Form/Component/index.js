import React from 'react';
import PropTypes from 'prop-types';

import AssetAmount from 'src/models/AssetAmount';

import { syncQueryParams } from 'utils/syncQueryParams';
import translate from 'services/translate';

import cn from 'utils/bem';

import positiveNumberMask from 'validators/masks/positiveNumber';
import WalletAssetIcon from 'icons/wallet-asset.svg';

import AssetDropdown from 'components/AssetDropdown';
import FeePanel from 'components/FeePanel';
import InputDefaultValue from 'components/InputDefaultValue';

import Button from 'elements/Button';
import InputValidator from 'elements/InputValidator';
import Warning from 'elements/Warning';
import Translate from 'elements/Translate';
import TestnetWarning from 'elements/TestnetWarning';

import './style.styl';

const b = cn('detokenize-form');

const Component = ({
  validation,
  meta,
  data,
  fields,

  onAssetChange,
  onAmountChange,
  onAddressChange,
  onFeeAssetChange,
  onSubmit
}) => {
  const { asset, amount, feeAsset, address } = fields;
  const { availableAssets, feeAssets, fee } = data;

  const buttonDisabled = validation.invalid || fee.isLoading;

  return (
    <div className={b()}>
      <div className={b('content')}>
        <div className={b('asset')}>
          <label className={b('label')}>
            <Translate path="page.send.assets" />
          </label>
          <AssetDropdown
            className={b('asset-selector')}
            assets={availableAssets}
            onChange={syncQueryParams('asset', 'displayName', onAssetChange)}
            selectedAsset={asset}
          />
        </div>
        <div className={b('max-amount')}>
          <WalletAssetIcon className={b('max-amount-icon')} />
          <Translate
            path="page.detokenize.maxAmount"
            params={{ amount: meta.maxAmount, asset: asset.displayName }}
          />
        </div>
        <div className={b('amount')}>
          <label className={b('label')}>{translate('page.send.amount')}</label>
          <InputDefaultValue
            className={b('amount-input')}
            inputProps={{
              mods: ['white'],
              placeholder: translate('common.placeholder.amount'),
              onChange: onAmountChange,
              value: amount,
              error: validation.amount,
              mask: positiveNumberMask
            }}
            defaultValue={String(meta.maxAmount)}
            label={translate('common.max')}
          />
        </div>
        <FeePanel
          className={b('fee-panel')}
          assets={feeAssets}
          selectedFeeAsset={feeAsset}
          onChangeAsset={onFeeAssetChange}
          feeAmount={fee.feeAmount}
          amount={amount}
          showDetails={meta.fee.showDetails}
          isLoading={fee.isLoading}
          showPercentages={meta.fee.showPercentages}
        />

        <div className={b('address')}>
          <label className={b('address-label')}>
            <Translate path="page.detokenize.addressLabel" />
          </label>
          <InputValidator
            className={b('address-input')}
            mods={['white']}
            placeholder={translate('page.detokenize.placeholder')}
            onChange={onAddressChange}
            value={address}
            error={validation.address}
          />

          <TestnetWarning
            className={b('testnet-warning')}
            message={translate('page.detokenize.testnetWarning')}
          />
        </div>
        {meta.externalFee && (
          <Warning className={b('warning')}>
            <span>
              <Translate path="page.detokenize.feeLabel" />{' '}
              {AssetAmount.parse(meta.externalFee, asset.precision)}{' '}
              {asset.displayName}
            </span>
          </Warning>
        )}
      </div>
      <div className={b('footer')}>
        <Button
          className={b('confirm-button')}
          mods="light"
          label="Confirm"
          disabled={buttonDisabled}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

Component.propTypes = {
  validation: PropTypes.shape({}),
  meta: PropTypes.shape({}),
  data: PropTypes.shape({}),
  fields: PropTypes.shape({}),

  onAssetChange: PropTypes.func,
  onAmountChange: PropTypes.func,
  onAddressChange: PropTypes.func,
  onFeeAssetChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default Component;
