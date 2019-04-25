import React from 'react';

import { DIRECTION } from 'pages/Exchange/Pro/Page/constants/orderBookDirection';

import Translate from 'elements/Translate';
import ExchangeIcon from 'icons/exchange-icon-blue.svg';

import { Controls, ToggleDirectionButton } from './styled';
import { propTypes } from './props';

const OrderBookControls = ({ direction, toggleDirection }) => (
  <Controls reverse={direction === DIRECTION.REVERSE}>
    <Translate path="page.exchangePro.headers.buying" />
    <ToggleDirectionButton onClick={toggleDirection}>
      <ExchangeIcon />
    </ToggleDirectionButton>
    <Translate path="page.exchangePro.headers.selling" />
  </Controls>
);

OrderBookControls.propTypes = propTypes;

export default OrderBookControls;
