import styled from 'styled-components';
import { MarketsListContainer } from 'pages/Exchange/Pro/Page/MarketSelector/MarketsList/styled';

export const Selector = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Market = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 500px;
  justify-content: space-between;
  align-items: center;
  -webkit-appearance: none;
  padding: 10px 0px;
  cursor: pointer;

  ${MarketsListContainer} & {
    padding: 10px;

    &:hover {
      background-color: #40455b;
      border-radius: 6px;
    }
  }
`;

export const ArrowDown = styled.i`
  fill: #318af0;
  margin-left: 5px;

  & > svg {
    width: 12px;
    height: 9px;
  }
`;

export const MarketsSelect = styled.div`
  position: relative;
`;

export const BaseSelector = styled.aside`
  flex: 0 0 110px;
  border-right: solid 1px #3d4469;
`;

export const BaseList = styled.ul`
  display: block;
  margin: 0;
  list-style: none;
  max-height: 400px;
  overflow: auto;
`;

export const Base = styled.li`
  display: block;
  margin: 0;
  padding: 14px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  font-weight: 500;
  color: ${props => (props.active ? 'white' : 'rgba(255,255,255, 0.5)')};
  background-color: ${props => (props.active ? '#40455b' : 'none')};

  &:hover {
    cursor: pointer;
    background-color: #40455b;
  }

  & > svg {
    width: 22px;
    height: 22px;
    margin-right: 8px;
    opacity: ${props => (props.active ? 1 : 0.5)};
  }
`;

export const Markets = styled.section`
  display: flex;
  flex-direction: row;
  position: absolute;
  max-height: 400px;
  overflow: hidden;
  top: calc(100%);
  left: -10px;
  border-radius: 8px;
  background-color: #303652;
  box-shadow: 0 2px 10px rgba(47, 38, 78, 0.05);
  padding: 0;
  z-index: 1;

  &:after {
    position: absolute;
    bottom: 0;
    background-image: linear-gradient(
      180deg,
      rgba(48, 54, 82, 0) 2%,
      #303652 97%
    );
    content: '';
    height: 23px;
    width: 100%;
    z-index: 2;
  }
`;

const color = props => {
  if (props.percentage > 0) {
    return '#32ab51';
  } else if (props.percentage < 0) {
    return '#e75a5a';
  } else {
    return 'white';
  }
};

const size = props => {
  if (props.price) {
    return '0 0 120px';
  } else if (props.auto) {
    return '0';
  } else if (props.flex) {
    return props.flex;
  } else {
    return '0 0 75px';
  }
};

export const Digits = styled.span`
  color: ${color};
  font-size: ${props => props.fontSize || '12px'};

  flex: ${size};
  white-space: ${props => (props.auto ? 'nowrap' : 'normal')};
  text-align: left;
`;

export const Label = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: ${props => props.fontSize || '10px'};

  flex: ${size};
  white-space: ${props => (props.auto ? 'nowrap' : 'normal')};

  text-align: left;
`;

export const Volume = styled.span`
  color: white;
  font-size: 12px;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-weight: 500;
  flex: 1;
  margin-right: ${props => (props.header ? '27px' : 0)};

  & > * {
    margin-left: 10px;

    &:first-child {
      margin-left: 0;
    }
  }
`;
