import React from 'react';
import { connect } from 'react-redux';

import Translate from 'elements/Translate';
import { accountSelectors } from 'src/ducks/account';
import { Consumer as OpenOrders } from 'src/providers/OpenOrders';
import OpenOrder from 'pages/Exchange/Pro/Page/OpenOrder';

import PlaceholderIcon from 'icons/no-open-positions.svg';

import { Placeholder, Icon, OpenPositionsWrapper, Text, Order } from './styled';
import { propTypes } from './props';

const OpenPositions = ({ orders, closeOrder, accountId }) => {
  const isEmpty = orders.length === 0;

  return (
    <OpenPositionsWrapper isEmpty={isEmpty}>
      {isEmpty ? (
        <Placeholder>
          <Icon>
            <PlaceholderIcon />
          </Icon>
          <Text>
            <Translate path="page.exchangePro.noOpenPositions" />
          </Text>
        </Placeholder>
      ) : (
        orders.map(order => (
          <Order key={order.id}>
            <OpenOrder order={order} closeOrder={closeOrder(accountId)} />
          </Order>
        ))
      )}
    </OpenPositionsWrapper>
  );
};

OpenPositions.propTypes = propTypes;

export default connect(state => ({
  accountId: accountSelectors.accountId(state)
}))(props => (
  <OpenOrders>
    {({ orders, closeOrder }) => (
      <OpenPositions {...props} orders={orders} closeOrder={closeOrder} />
    )}
  </OpenOrders>
));
