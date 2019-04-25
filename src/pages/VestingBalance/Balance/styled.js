import styled from 'styled-components';

export const Balance = styled.section`
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(46, 38, 78, 0.05);
  border-radius: 8px;
  padding: 0 24px;
  margin-bottom: 20px;
  /* & + & {
    margin-top: 20px;
  } */
`;

export const Block = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: auto;
`;

export const BlockHeader = styled.header`
  opacity: 0.9;
  color: rgba(23, 30, 50, 0.5);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.09px;
  margin-bottom: 5px;
`;

export const BlockContent = styled.section`
  display: flex;
  flex-direction: column;
`;

export const BlockData = styled.section`
  color: #313747;
  font-size: 14px;
  font-weight: 600;
`;

export const BlockIcon = styled.i`
  margin-right: 12px;

  & > svg {
    width: 28px;
    height: 28px;
  }
`;

export const DateTime = styled(BlockContent)`
  padding: 10px;
  border-radius: 6px;
  background-color: #f9f9fb;
  flex-basis: 120px;
  & + & {
    margin-left: 10px;
  }
`;

export const BalanceRow = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;

  & + & {
    border-top: solid 1px #f2f2f4;
  }
`;
