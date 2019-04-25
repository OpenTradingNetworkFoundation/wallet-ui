import styled from 'styled-components';

export const MenuWrapper = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 0 0 75px;
  padding-top: 10px;
  border-left: solid 1px #3d4469;
`;

export const Icon = styled.i`
  fill: currentColor;
  width: 22px;
  height: 21px;
  display: inline-block;
  margin-bottom: 7px;
  transform: rotate(90deg);

  & > * {
    width: 100%;
    height: 100%;
  }
`;

export const Text = styled.span``;

export const Badge = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  line-height: 20px;

  font-size: 12px;
  color: white;
  text-align: center;
  background-color: #3080de;
  position: absolute;
  top: 5px;
  right: 4px;
`;

export const MenuItem = styled.button.attrs({ type: 'button' })`
  background-color: ${props =>
    props.active ? 'rgba(255, 255, 255, 0.08)' : 'transparent'};

  opacity: ${props => (props.active ? 1 : 0.5)};
  border: none;
  outline: none;
  cursor: pointer;

  position: relative;
  color: white;
  font-size: 12px;
  font-weight: 500;
  padding: 14px 12px 12px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;
