import styled from 'styled-components';

export const OrderBookContainer = styled.div`
  min-height: 0;
  flex-grow: 1;
  display: flex;
  padding-top: 16px;

  flex-direction: ${props => (props.reverse ? 'row-reverse' : 'row')};
`;
