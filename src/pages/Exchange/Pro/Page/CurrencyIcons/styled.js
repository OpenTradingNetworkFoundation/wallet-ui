import styled from 'styled-components';

export const Container = styled.span`
  > * {
    width: 20px;
    height: 20px;
    z-index: 1;
    position: relative;

    &:first-child {
      background-color: #2b3049;
      border-radius: 100%;
    }

    &:not(:first-child) {
      margin-left: -10px;
      z-index: 0;
    }
  }
`;
