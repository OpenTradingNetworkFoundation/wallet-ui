import React from 'react';

import cn from 'utils/bem';
import translate from 'services/translate';
import { syncQueryParams } from 'utils/syncQueryParams';
import positiveNumberMask from 'validators/masks/positiveNumber';
import InputDefaultValue from 'components/InputDefaultValue';
import PriceBar from 'elements/PriceBar';
import Button from 'elements/Button';
import Warning from 'elements/Warning';
import Translate from 'elements/Translate';
import FeePanel from 'components/FeePanel';

import WalletAssetIcon from 'icons/wallet-asset.svg';
import ExchangeIcon from 'icons/exchange-icon-blue.svg';

import AssetSelector from '../../AssetSelector';

import { propTypes } from './props';

import './style.styl';

const b = cn('exchange-form');

const Component = ({
  onFromAssetChange,
  onToAssetChange,
  onFromAmountChange,
  onMaxClick,
  onToAmountChange,
  onFeeAssetChange,
  onFormSubmit,
  onExchangeAssets,
  onFocusedInput,
  fields,
  validation,
  meta,
  data
}) => {
  const { priceMeta, fee, availableBalances, exchangeScheme } = data;
  const { toAsset, fromAsset, fromAmount, toAmount, feeAsset } = fields;

  const displayPrice = priceMeta.price;

  const hasAmountError = Boolean(validation.fromAmount || validation.toAmount);

  const isPriceAvailable = priceMeta.isAvailable;

  const showPercentages = isPriceAvailable && fromAsset.id === feeAsset.id;

  const buttonDisabled =
    !isPriceAvailable || validation.invalid || fee.isLoading;

  const isExchangeDisabled = toAsset.amount === 0;

  return (
    <div className={b()}>
      <div className={b('row')}>
        <div className={b('content')}>
          <div className={b('selectors')}>
            <div className={b('selector', 'with-border')}>
              <AssetSelector
                availableAssets={availableBalances}
                selectedAsset={fromAsset}
                excludedAsset={toAsset}
                onChange={syncQueryParams(
                  'asset',
                  'displayName',
                  onFromAssetChange
                )}
              />

              <div className={b('amount')}>
                <WalletAssetIcon className={b('amount-icon')} />
                <Translate
                  path="page.exchange.available"
                  params={{
                    asset: fromAsset.displayName,
                    amount: meta.fromMaxAmount
                  }}
                />
              </div>

              <InputDefaultValue
                className={b('input')}
                inputProps={{
                  dataTestId: 'from-exchange-input',
                  mods: ['white'],
                  placeholder: translate('common.placeholder.amount'),
                  onChange: onFromAmountChange,
                  value: fromAmount,
                  error: validation.fromAmount,
                  mask: positiveNumberMask,
                  onFocus: () => onFocusedInput('fromAmount'),
                  isActive: meta.currentActiveInput === 'fromAmount'
                }}
                onLabelClick={() => onMaxClick('fromAmount')}
                label={translate('common.max')}
                disabled={!isPriceAvailable}
              />
            </div>

            <button
              data-testid="exchange-icon-container"
              className={b('exchange-icon-container')}
              type="button"
              onClick={() => !isExchangeDisabled && onExchangeAssets()}
            >
              <ExchangeIcon
                className={b('exchange-icon', { disabled: isExchangeDisabled })}
              />
            </button>

            <div className={b('selector', 'right')}>
              <AssetSelector
                availableAssets={exchangeScheme[fromAsset.id]}
                selectedAsset={toAsset}
                excludedAsset={fromAsset}
                onChange={onToAssetChange}
              />

              <div className={b('amount')}>
                <WalletAssetIcon className={b('amount-icon')} />
                <Translate
                  path="page.exchange.available"
                  params={{
                    asset: toAsset.displayName,
                    amount: toAsset.displayAmount
                  }}
                />
              </div>

              <InputDefaultValue
                className={b('input')}
                inputProps={{
                  dataTestId: 'to-exchange-input',
                  mods: ['white'],
                  placeholder: translate('common.placeholder.amount'),
                  onChange: onToAmountChange,
                  value: toAmount,
                  error: validation.toAmount,
                  mask: positiveNumberMask,
                  onFocus: () => onFocusedInput('toAmount'),
                  isActive: meta.currentActiveInput === 'toAmount'
                }}
                disabled={!isPriceAvailable}
                onLabelClick={() => onMaxClick('toAmount')}
                label={translate('common.max')}
              />
              <Warning className={b('warning')}>
                <Translate path="page.exchange.warning" />
              </Warning>
            </div>
          </div>

          <PriceBar
            className={b('price')}
            isAvailable={priceMeta.isAvailable}
            price={displayPrice}
            fromAssetName={fromAsset.asset}
            toAssetName={toAsset.asset}
          />

          <FeePanel
            className={b('fee-panel')}
            assets={availableBalances}
            selectedFeeAsset={feeAsset}
            onChangeAsset={onFeeAssetChange}
            feeAmount={fee.feeAmount}
            amount={fromAmount}
            showDetails={
              isPriceAvailable && !hasAmountError && Boolean(fee.feeAmount)
            }
            isLoading={fee.isLoading}
            showPercentages={showPercentages}
          />
        </div>
      </div>
      <div className={b('row')}>
        <Button
          className={b('exchange-button')}
          mods="light"
          label={translate('page.exchange.buttonLabel')}
          onClick={onFormSubmit}
          disabled={buttonDisabled}
        />
      </div>
    </div>
  );
};

Component.propTypes = propTypes;

export default Component;
