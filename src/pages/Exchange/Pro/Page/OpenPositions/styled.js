import styled from 'styled-components';

export const Placeholder = styled.section`
  max-width: 130px;
  text-align: center;
`;

export const Icon = styled.div`
  max-width: 100%;
  height: 24px;
  margin-bottom: 12px;

  & > * {
    width: 100%;
    height: 100%;
  }
`;

export const Text = styled.span`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
`;

export const OpenPositionsWrapper = styled.section`
  display: flex;
  width: 100%;
  height: 100%;

  align-items: ${props => (props.isEmpty ? 'center' : 'stretch')};
  justify-content: ${props => (props.isEmpty ? 'center' : 'flex-start')};
  flex-direction: ${props => (props.isEmpty ? 'row' : 'column')};
`;

export const Order = styled.div`
  & + & {
    margin-top: 8px;
  }
`;
