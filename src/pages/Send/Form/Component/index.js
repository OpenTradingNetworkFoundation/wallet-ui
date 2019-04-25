import React from 'react';
import translate from 'src/services/translate';

import localizer from 'utils/localizer';
import cn from 'utils/bem';
import { syncQueryParams } from 'utils/syncQueryParams';

import FeePanel from 'components/FeePanel';
import AssetDropdown from 'components/AssetDropdown';
import InputDefaultValue from 'components/InputDefaultValue';
import InputUserAvatar from 'components/InputUserAvatar';
import Button from 'elements/Button';
import positiveNumberMask from 'validators/masks/positiveNumber';
import Translate from 'elements/Translate';
import TextArea from 'elements/TextArea';
import Tooltip from 'elements/Tooltip';

import WalletAssetIcon from 'icons/wallet-asset.svg';
import QuestionIcon from 'icons/question.svg';

import { propTypes } from './props';

import './style.styl';

const b = cn('send-form');

const Component = ({
  onAssetChange,
  onAmountChange,
  onSubmit,
  onUsernameChange,
  onFeeAssetChange,
  onMemoChange,
  fields,
  meta,
  validation,
  data
}) => {
  const { asset, amount, feeAsset, username } = fields;
  const { availableAssets, fee, userLookUp } = data;

  return (
    <div className={b()}>
      <div className={b('content')}>
        <div className={b('asset')}>
          <label className={b('label')}>
            {localizer.getValue('page.send.assets')}
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
            path="page.send.maxAmount"
            params={{ amount: meta.maxAmount, asset: asset.displayName }}
          />
        </div>

        <div className={b('amount')}>
          <label className={b('label')}>
            {localizer.getValue('page.send.amount')}
          </label>
          <InputDefaultValue
            className={b('input')}
            inputProps={{
              id: 'amount',
              mods: ['white'],
              placeholder: localizer.getValue('common.placeholder.amount'),
              onChange: onAmountChange,
              value: amount,
              error: validation.amount,
              mask: positiveNumberMask
            }}
            defaultValue={String(meta.maxAmount)}
            label={localizer.getValue('common.max')}
          />
        </div>

        <div className={b('memo-container')}>
          <label className={b('label')}>
            <Translate path="page.send.memo" />
            <Tooltip
              className={b('tooltip-container')}
              contentClassName={b('tooltip')}
              mods={['white']}
              useContext
              position="right"
              renderTooltip={() => <QuestionIcon />}
              renderTitle={() => (
                <React.Fragment>
                  <Translate path="page.send.tooltip.info" />
                  <Translate
                    className={b('tooltip-warning')}
                    path="page.send.tooltip.warning"
                  />
                </React.Fragment>
              )}
            />
            <Translate
              className={b('memo-optional')}
              path="page.send.optional"
            />
          </label>
          <TextArea
            placeholder={translate('page.send.memoPlaceholder')}
            disabled={meta.metaDisabled}
            className={b('memo-textarea')}
            value={fields.memo}
            onChange={onMemoChange}
            maxLength={1000}
          />
        </div>

        <FeePanel
          className={b('fee-panel')}
          assets={availableAssets}
          selectedFeeAsset={feeAsset}
          onChangeAsset={onFeeAssetChange}
          feeAmount={fee.feeAmount}
          amount={amount}
          showDetails={meta.fee.showDetails}
          isLoading={fee.isLoading}
          showPercentages={meta.fee.showPercentages}
        />

        <div className={b('user-selector')}>
          <label className={b('user-label')}>TO</label>
          <InputUserAvatar
            inputProps={{
              mods: ['white'],
              placeholder: localizer.getValue('common.placeholder.username'),
              onChange: onUsernameChange,
              value: username,
              error: validation.username
            }}
            isLoading={userLookUp.isLoading}
          />
        </div>
      </div>
      <div className={b('footer')}>
        <Button
          className={b('confirm-button')}
          mods="light"
          label="Confirm"
          disabled={meta.buttonDisabled}
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

Component.propTypes = propTypes;

export default Component;
