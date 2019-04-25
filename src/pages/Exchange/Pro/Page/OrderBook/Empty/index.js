import React from 'react';

import Translate from 'elements/Translate';

import ORDER_BOOK_TYPE from 'pages/Exchange/Pro/Page/constants/orderBookType';

import EmptyOrderBookIcon from 'icons/empty-order-book.svg';

import { Container, Icon, Text } from './styled';
import { propTypes } from './props';

const EmptyOrderBook = ({ type, children }) => (
  <Container type={type}>
    <Icon>
      <EmptyOrderBookIcon />
    </Icon>
    <Text>
      {children ? (
        children
      ) : (
        <Translate
          path={`page.exchangePro.empty.${
            type === ORDER_BOOK_TYPE.ASKS ? 'askOrders' : 'bidOrders'
          }`}
        />
      )}
    </Text>
  </Container>
);

EmptyOrderBook.propTypes = propTypes;

export default EmptyOrderBook;
