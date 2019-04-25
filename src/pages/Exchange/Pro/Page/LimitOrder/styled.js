import styled from 'styled-components';

export const LimitOrderForm = styled.form`
  margin-top: 16px;
  flex: 100%;
`;

export const OrderButton = styled.button`
  display: block;
  width: 100%;

  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-transform: uppercase;
  text-align: center;
  color: white;
  padding: 10px 0;
  border-radius: 8px;

  cursor: pointer;
  border: 0;
  outline: 0;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${props => (props.buy ? '#2fc26f' : '#ee604d')};
  margin-top: 12px;
`;

export const Balances = styled.div`
  margin: 20px 0;
`;

export const Balance = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  text-transform: uppercase;
  margin-top: 8px;

  & > svg {
    width: 17px;
    height: 14px;
    margin-right: 9px;
    display: inline-block;
  }
`;

export const Icon = styled.i``;
export const Text = styled.span``;

export const Fee = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  margin-top: 15px;
  display: flex;
  align-items: center;

  & ${Icon} {
    margin-right: 8px;
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const ErrorMessage = styled.div`
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
`;
