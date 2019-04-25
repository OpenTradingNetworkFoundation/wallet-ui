import React from 'react';

import Translate from 'elements/Translate';
import { DISPLAY_CURRENCY } from 'pages/Exchange/Pro/Page/constants/displayCurrency';

import { Container, ColumnName, Currency } from './styled';
import { propTypes } from './props';

const OrderBookHeader = ({
  base,
  quote,
  totalCurrency,
  toggleTotalCurrency
}) => {
  return (
    <Container>
      <ColumnName>
        <Translate path="page.exchangePro.headers.total" />
        &nbsp;(<Currency onClick={toggleTotalCurrency}>
          {totalCurrency === DISPLAY_CURRENCY.BASE ? base : quote}
        </Currency>)
      </ColumnName>
      <ColumnName align="center" margin="0 10px 0 0">
        <Translate path="page.exchangePro.headers.amount" />
        <span> ({base})</span>
      </ColumnName>
      <ColumnName align="center">
        <Translate path="page.exchangePro.headers.price" />
      </ColumnName>
      <ColumnName align="center" margin="0 0 0 10px">
        <Translate path="page.exchangePro.headers.amount" />
        <span> ({base})</span>
      </ColumnName>
      <ColumnName align="right">
        <Translate path="page.exchangePro.headers.total" />
        &nbsp;(<Currency onClick={toggleTotalCurrency}>
          {totalCurrency === DISPLAY_CURRENCY.BASE ? base : quote}
        </Currency>)
      </ColumnName>
    </Container>
  );
};

OrderBookHeader.propTypes = propTypes;

export default OrderBookHeader;
