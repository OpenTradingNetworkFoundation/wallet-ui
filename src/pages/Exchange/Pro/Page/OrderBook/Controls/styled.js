import styled from 'styled-components';

export const Controls = styled.section`
  display: flex;
  flex-direction: ${props => (props.reverse ? 'row-reverse' : 'row')};
  justify-content: space-between;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  padding: 0 10px 12px;
  position: relative;
`;

export const ToggleDirectionButton = styled.button.attrs({ type: 'button' })`
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  & > svg {
    width: 10px;
    height: 12px;
  }
`;
