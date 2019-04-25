import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 5px;
  background-color: #303652;
  padding: 16px;
  width: 100%;
  color: #ffffff;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${props => props.marginTop || '8px'};
`;

export const Title = styled.span`
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  margin-left: 6px;
`;

export const Percentage = styled.span`
  font-size: 12px;
  font-weight: 700;
`;

export const Progress = styled.div`
  flex: 1;
  height: 4px;
  margin-left: 8px;
`;

export const Label = styled.span`
  opacity: 0.5;
  font-size: 12px;
  font-weight: 500;
`;

export const Text = styled.span`
  margin-left: auto;
  font-size: 12px;
  font-weight: 500;

  display: flex;
  align-items: center;
`;

export const Icon = styled.i`
  margin-left: 4px;
  & > svg {
    width: 16px;
    height: 16px;
  }
`;

export const ConfirmText = styled.span`
  text-transform: uppercase;
  line-height: 24px;
  font-weight: 700;
  font-size: 16px;

  opacity: ${props => (props.isLoading ? 0 : 1)};
`;

export const CloseLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const CloseIcon = styled.i`
  & > svg {
    width: 12px;
    height: 12px;
    fill: #ffffff;
  }
`;

export const Button = styled.button`
  color: #ffffff;
  position: relative;

  padding: ${props => props.padding || '0'};
  margin: ${props => props.margin || '0'};

  background-color: #40455b;
  border-radius: 6px;
  border: none;
  outline: none;

  &:hover {
    background-color: #2a2d42;
  }

  &:disabled {
    opacity: 0.5;

    &:hover {
      background-color: #40455b;
    }
  }
`;

export const TrashIcon = styled.i`
  & > svg {
    width: 9px;
    height: 12px;
  }
`;

export const SpinnerContainer = styled.div`
  position: absolute;
  top: 10px;
  left: calc(50% - 8px);
`;
