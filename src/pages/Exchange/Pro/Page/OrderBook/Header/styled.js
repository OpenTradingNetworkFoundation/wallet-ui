import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr) 2fr repeat(2, 1fr);
  padding: 0 10px;
`;

export const ColumnName = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  font-weight: 500;
  text-align: ${props => props.align || 'left'};
  margin: ${props => props.margin || '0'};
`;

export const Currency = styled.span`
  cursor: pointer;
  border-bottom: dashed 1px rgba(255, 255, 255, 0.25);

  &:hover {
    border-bottom: dashed 1px rgba(255, 255, 255, 0.5);
  }
`;
