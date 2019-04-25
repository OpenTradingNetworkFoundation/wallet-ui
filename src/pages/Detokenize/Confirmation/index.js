import React from 'react';
import { connect } from 'react-redux';

import AssetIcon from 'elements/AssetIcon';
import FeePercentage from 'elements/FeePercentage';
import Translate from 'elements/Translate';

import ConfirmationBox from 'components/ConfirmationBox';

import { accountSelectors } from 'ducks/account';
import cn from 'utils/bem';
import translate from 'services/translate';

import { propTypes } from './props';
import './style.styl';

const b = cn('detokenize-confirmation');

const Confirmation = props => {
  const { asset, amount, feeAmount, feeAsset, address, ...handlers } = props;

  return (
    <ConfirmationBox
      {...handlers}
      render={() => (
        <div className={b()}>
          <section className={b('row')}>
            <div className={b('col')}>
              <header className={b('confirm-header')}>
                <Translate path="page.detokenize.assets" />
              </header>
              <div className={b('asset-display-name')}>{asset.displayName}</div>
              <div className={b('asset-full-name')}>
                <AssetIcon
                  className={b('icon')}
                  assetName={asset.name}
                  isTokenized={false}
                />
                <span className={b('text')}>{asset.fullName}</span>
              </div>
            </div>

            <div className={b('col')}>
              <header className={b('confirm-header')}>Amount</header>
              <div className={b('confirm-value')}>{amount}</div>
            </div>

            <div className={b('col')}>
              <header className={b('confirm-header')}>
                <FeePercentage
                  percentage={feeAmount / amount}
                  showPercentage={feeAsset.id === asset.id}
                />
              </header>
              <div className={b('confirm-value')}>
                {feeAmount} {feeAsset.displayName}
              </div>
            </div>
          </section>
          <section className={b('row')}>
            <div className={b('col')}>
              <Translate
                className={b('confirm-header')}
                path="page.detokenize.confirm.addressHeader"
              />
              <div className={b('confirm-value')}>{address}</div>
            </div>
          </section>
        </div>
      )}
      confirmButtonLabel={translate('page.detokenize.confirm.buttonText')}
    />
  );
};

Confirmation.propTypes = propTypes;

export default connect(state => ({
  accountName: accountSelectors.accountName(state)
}))(Confirmation);
