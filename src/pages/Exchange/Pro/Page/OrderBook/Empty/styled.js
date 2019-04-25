import styled from 'styled-components';

import ORDER_BOOK_TYPE from 'pages/Exchange/Pro/Page/constants/orderBookType';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;

  background: repeating-linear-gradient(
    45deg,
    rgba(48, 54, 82, 0.2),
    rgba(48, 54, 82, 0.2) 5px,
    #303652 5px,
    #303652 7px
  );

  margin-left: ${props => (props.type === ORDER_BOOK_TYPE.ASKS ? '2.5px' : 0)};
  margin-right: ${props => (props.type === ORDER_BOOK_TYPE.BIDS ? '2.5px' : 0)};
`;

export const Icon = styled.i`
  margin: 0 auto;
  & > svg {
    width: 41px;
    height: 38px;
  }
`;

export const Text = styled.span`
  margin: 10px auto 0;
  color: #9597a4;
  font-weight: 500;
  font-size: 12px;
`;
