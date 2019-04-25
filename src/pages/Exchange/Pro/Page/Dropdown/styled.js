import styled from 'styled-components';

export const Dropdown = styled.div`
  & .Select-menu-outer {
    padding: 4px 0px;
    position: absolute;
    width: 100%;
    z-index: 1;
  }
`;

export const Header = styled.div`
  cursor: pointer;
`;

export const ArrowDown = styled.i`
  fill: #318af0;
  margin-left: 8px;

  & > svg {
    width: 8px;
    height: 6px;
    margin-bottom: 3px;
  }
`;

export const SelectedValue = styled.span`
  opacity: 0.9;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.11px;
`;

export const Menu = styled.div`
  box-shadow: 0 2px 10px rgba(47, 38, 78, 0.05);
  border-radius: 6px;
  background-color: #303652;
  padding: 8px;
  animation: appear 0.3s linear;
`;

export const List = styled.ul`
  list-style-type: none;
`;

export const Value = styled.li`
  border-radius: 6px;
  font-size: 14px;
  color: #ffffff;
  font-weight: 700;
  padding: 8px;
  opacity: ${props => (props.selected ? '1' : '0.5')};
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  & + & {
    margin-top: 8px;
  }
`;
