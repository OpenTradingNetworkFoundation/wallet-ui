import React from 'react';

import localizer from 'utils/localizer';
import cn from 'utils/bem';
import URL from 'enums/url';

import Button from 'elements/Button';
import TokenizedIcon from 'elements/TokenizedIcon';
import withRouter from 'hocs/withRouter';

import Arrow from 'icons/tokenized-assets/arrow.svg';
import BitcoinIcon from 'icons/coins/btc-coin-transparent.svg';

import { propTypes } from './props';
import './style.styl';

const b = cn('tokenized-assets-list-empty');

class Empty extends React.PureComponent {
  static propTypes = propTypes;

  render() {
    const { routerActions, location } = this.props;

    return (
      <div className={b()}>
        <div className={b('content')}>
          <div className={b('picture')}>
            <BitcoinIcon className={b('coin')} />
            <Arrow className={b('arrow')} />
            <TokenizedIcon
              Icon={BitcoinIcon}
              className={b('coin', 'tokenized')}
            />
          </div>
          <div className={b('text')}>
            {localizer.getValue('page.wallet.tokenizedAssetsEmpty')}
          </div>
          <Button
            className={b('button')}
            label={localizer.getValue('page.wallet.tokenize')}
            mods="light"
            onClick={() => {
              routerActions.navigate({
                pathname: URL.TOKENIZE,
                search: { asset: 'BTC' },
                from: location
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Empty);
