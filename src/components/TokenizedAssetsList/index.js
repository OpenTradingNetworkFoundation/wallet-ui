import React from 'react';

import localizer from 'utils/localizer';
import cn from 'utils/bem';
import Url from 'elements/Url';
import Asset from 'components/Asset';
import URL from 'enums/url';

import Empty from './Empty';
import { propTypes } from './props';

import './TokenizedAssetsList.styl';

const b = cn('tokenized-assets-list');

class TokenizedAssetsList extends React.PureComponent {
  static propTypes = propTypes;

  render() {
    const { assets } = this.props;

    const assetsList = assets.map(asset => (
      <div className={b('row')} key={asset.id}>
        <Asset asset={asset} />
      </div>
    ));

    return (
      <div className={b()}>
        <div className={b('label')}>
          <span className={b('label-text')}>
            {localizer.getValue('page.wallet.tokenizedAssetsLabel')}
          </span>
          <Url
            className={b('label-link')}
            link={{ pathname: URL.TOKENIZE, search: '?asset=BTC' }}
          >
            {localizer.getValue('page.wallet.tokenize')}
          </Url>
        </div>

        {assetsList.length ? assetsList : <Empty />}
      </div>
    );
  }
}

export default TokenizedAssetsList;
