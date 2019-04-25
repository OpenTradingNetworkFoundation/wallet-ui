import React from 'react';

import { createMarket } from 'pages/Exchange/Pro/Page/MarketSelector/helpers';
import CurrencyIcons from 'pages/Exchange/Pro/Page/CurrencyIcons';

import { Pair, Wrapper } from './styled';
import { propTypes } from './props';

class CurrencyPair extends React.PureComponent {
  static propTypes = propTypes;

  render() {
    const { base, quote } = this.props;

    return (
      <Wrapper>
        <CurrencyIcons base={base} quote={quote} />
        <Pair>{createMarket(base, quote)}</Pair>
      </Wrapper>
    );
  }
}

export default CurrencyPair;
