import styled from 'styled-components';

export const Group = styled.div`
  margin-bottom: 14px;
`;

export const Label = styled.label`
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  display: block;
  margin-bottom: 5px;
`;

export const LabeledInput = styled.input`
  width: 166px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #4c526d;
  padding: 12px calc(17px + 16px + 17px) 12px 17px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  background: transparent;
  outline: 0;
`;

export const InputIcon = styled.i`
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);

  & > svg {
    width: 16px;
    height: 16px;
  }
`;

export const LabeledInputContainer = styled.div`
  position: relative;
  width: 100%;
`;
