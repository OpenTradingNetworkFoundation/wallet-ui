import styled from 'styled-components';

export const TradeHistory = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex-grow: ${props => (props.empty ? 1 : 0)};
  min-height: ${props => (props.empty ? '100%' : 0)};
`;

export const TradeHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TradeHistoryTable = styled.div`
  flex: 1 1 auto;
  display: flex;
  height: 100%;
  width: 100%;

  &::after {
    position: absolute;
    bottom: -1px;
    background-image: linear-gradient(
      180deg,
      rgba(48, 54, 82, 0) 2%,
      #303652 97%
    );
    content: '';
    height: 23px;
    width: 100%;
    z-index: 1;
  }
`;

export const Trade = styled.div`
  width: 100%;
  padding: 6px 12px;
  min-height: 26px;
  align-items: center;
  display: flex;
  flex-direction: row;

  background-color: ${props =>
    `rgba(${props.backgroundColor}, ${props.opacity})`};

  &:hover {
    cursor: default;
    background-color: rgba(64, 69, 91, 0.5);
  }
`;

export const Text = styled.div`
  flex: 1 1 33%;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.09px;
  color: white;

  &:nth-child(1) {
    text-align: left;
  }

  &:nth-child(2) {
    text-align: center;
  }

  &:nth-child(3) {
    text-align: right;
    opacity: 0.5;
  }
`;

export const Amount = styled(Text)`
  color: ${props => (props.buy ? '#32ab51' : '#e75a5a')};
`;

export const Header = styled.header`
  width: 100%;
  padding: 0 12px;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;

  & > ${Text} {
    color: rgba(255, 255, 255, 0.5);
    opacity: 1;
  }
`;
