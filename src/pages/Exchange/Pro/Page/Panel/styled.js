import styled from 'styled-components';

export const PanelWrapper = styled.section`
  border-left: solid 1px #3d4469;
  display: ${props => (props.hidden ? 'none' : 'block')};
  padding: 10px 12px;
  min-width: 256px;
  position: relative;
`;

export const Content = styled.div`
  overflow: auto;
  height: calc(100% - 20px);
  position: absolute;
  left: 0;
  width: 100%;
  padding: 0 10px;
`;
