import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  border-radius: 2px;
  height: 100%;

  background-color: ${props => (props.progress ? '#3080de' : '#3f466a')};
  width: ${props => (props.progress ? `${props.progress}%` : '100%')};
`;
