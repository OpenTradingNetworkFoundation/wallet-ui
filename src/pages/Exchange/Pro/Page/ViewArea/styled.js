import styled from 'styled-components';

export const View = styled.section`
  padding: 10px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 0;
  height: 100%;
`;

export const MainViewArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const OrderBookPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 10px;
  margin-top: 22px;
`;

export const OrderBookArea = styled.div`
  min-height: 0;
  margin-top: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const WidthContainer = styled.div`
  width: ${props => props.width || '0px'};
`;

export const AveragePrice = styled.span`
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-align: center;
`;

export const LimitOrderArea = styled.aside`
  display: flex;
  flex: 0 0 160px;
  flex-direction: column;
  padding-left: 20px;
  margin-top: 22px;
`;
