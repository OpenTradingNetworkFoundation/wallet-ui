import styled from 'styled-components';

const ASK_COLOR = '#e75a5a';
const BID_COLOR = '#32ab51';

const getStyle = (isAsk, ask, bid, defaultValue) => {
  if (isAsk === true) {
    return ask;
  } else if (isAsk === false) {
    return bid;
  } else {
    return defaultValue;
  }
};

export const List = styled.ul`
  overflow: auto;
`;

export const Container = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const BottomBorder = styled.div`
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
  z-index: 1;
`;

export const Item = styled.li`
  position: relative;
  display: flex;
  flex-direction: ${props => getStyle(props.isAsk, 'row-reverse', 'row')};
  padding: 6px 10px;
  cursor: pointer;

  &:hover {
    background-color: #303652;
  }
`;

export const Amount = styled.span`
  flex-basis: 33.33%;
  color: ${props => getStyle(props.isAsk, ASK_COLOR, BID_COLOR, '#ffffff')};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.09px;
  text-align: ${props => props.align || 'left'};
`;

export const TotalBar = styled.div.attrs({
  style: props => ({
    width: `${props.percentage}%`
  })
})`
  height: 100%;
  position: absolute;
  background-color: ${props => getStyle(props.isAsk, ASK_COLOR, BID_COLOR)};
  opacity: 0.25;
  top: 0;
  right: ${props => getStyle(props.isAsk, 'auto', 0)};
  left: ${props => getStyle(props.isAsk, 0, 'auto')};
`;
