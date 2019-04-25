import styled from 'styled-components';

export const MarketsHeader = styled.header`
  display: flex;
  flex-direction: row;
  padding: 16px 10px;
  margin: 0 10px;
`;

export const MarketsListContainer = styled.div`
  min-height: 280px;
  overflow: auto;
  padding: 10px 10px;

  & > *:hover {
    background-color: #40455b;
    border-radius: 6px;
  }
`;

export const MarketsSelector = styled.section`
  flex: 1 0 500px;
  width: 500px;
`;

export const MarketsSearch = styled.section`
  border-bottom: 1px solid #4c526d;
  padding: 16px 20px;
`;

export const MarketsSearchInput = styled.input`
  border: 1px solid #4c526d;
  border-radius: 4px;
  width: 100%;
  padding: 12px 18px;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: white;
  outline: none;
`;

export const NoMatch = styled.section`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  min-width: 500px;
  padding: 20px 16px;
  text-align: center;
  font-weight: 500;
`;

export const NoMatchIcon = styled.figure`
  margin: 90px 0 14px 0;

  & > svg {
    width: 47px;
    height: 54px;
  }
`;

export const NoMatchText = styled.span`
  display: inline-block;
  line-height: 14px;
  max-width: 170px;
`;
