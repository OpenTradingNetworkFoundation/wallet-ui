import React from 'react';

import { ACTIVE_MENU_ITEM } from 'pages/Exchange/Pro/Page/constants/activeMenuItem';
import { Consumer as OpenOrdersConsumer } from 'src/providers/OpenOrders';
import Translate from 'elements/Translate';

import ExchangeIcon from 'icons/exchange-mono.svg';

import { MenuWrapper, MenuItem, Icon, Text, Badge } from './styled';
import { propTypes } from './props';

const Menu = ({ setActiveMenuItem, activeMenuItem, orderCount }) => (
  <MenuWrapper>
    <MenuItem
      onClick={() => setActiveMenuItem(ACTIVE_MENU_ITEM.OPEN_POSITIONS)}
      active={activeMenuItem === ACTIVE_MENU_ITEM.OPEN_POSITIONS}
      data-testid="menu-item-orders"
    >
      <Icon>
        <ExchangeIcon />
      </Icon>
      <Text>
        <Translate path="page.exchangePro.menu.openOrders" />
      </Text>
      {orderCount !== 0 && <Badge>{orderCount}</Badge>}
    </MenuItem>
  </MenuWrapper>
);

Menu.propTypes = propTypes;

export default props => (
  <OpenOrdersConsumer>
    {({ orderCount }) => <Menu {...props} orderCount={orderCount} />}
  </OpenOrdersConsumer>
);
