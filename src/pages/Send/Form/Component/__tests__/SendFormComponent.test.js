import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import SendFormComponent from '../index';

// eslint-disable-next-line
jest.mock('elements/Translate', () => () => <span />);

const onAmountChange = jest.fn();
const onSubmit = jest.fn();
const onUsernameChange = jest.fn();

describe('a <SendFormComponent />', () => {
  const { container, getByText, getByPlaceholderText } = render(
    <SendFormComponent
      fields={{
        isDefault: false,
        asset: {
          id: '1.3.0',
          amount: 9999799980000,
          asset: 'OTN',
          name: 'OTN',
          precision: 8,
          displayAmount: '99997.9998',
          isCore: true,
          isTokenized: false,
          displayName: 'OTN',
          fullName: 'Open Trading Network'
        },
        amount: '',
        feeAsset: {
          id: '1.3.0',
          amount: 9999799980000,
          asset: 'OTN',
          name: 'OTN',
          precision: 8,
          displayAmount: '99997.9998',
          isCore: true,
          isTokenized: false,
          displayName: 'OTN',
          fullName: 'Open Trading Network'
        },
        username: ''
      }}
      data={{
        availableAssets: [
          {
            id: '1.3.0',
            amount: 9999799980000,
            asset: 'OTN',
            name: 'OTN',
            precision: 8,
            displayAmount: '99997.9998',
            isCore: true,
            isTokenized: false,
            displayName: 'OTN',
            fullName: 'Open Trading Network'
          }
        ],
        fee: { isLoading: false, feeAmount: '10000' },
        userLookUp: { isLoading: false, exist: true }
      }}
      meta={{
        maxAmount: '99997.9997',
        fee: { showDetails: false, showPercentages: false },
        buttonDisabled: false
      }}
      validation={{
        amount: 'Amount is required',
        username: 'User name is required',
        invalid: true
      }}
      onAmountChange={onAmountChange}
      onUsernameChange={onUsernameChange}
      onSubmit={onSubmit}
    />
  );

  expect(container).toBeTruthy();

  test('clicking on max sets max amount', () => {
    fireEvent.click(getByText('Max'));
    expect(onAmountChange).toBeCalledWith('99997.9997');
  });

  test('setting correct values in fields and clicking submit triggers submit', () => {
    getByPlaceholderText('Enter Amount').value = 10;
    fireEvent.change(getByPlaceholderText('Enter Amount'));

    getByPlaceholderText(/user name/i).value = 'test user';
    fireEvent.change(getByPlaceholderText(/user name/i));

    expect(onUsernameChange).toBeCalledWith('test user');

    fireEvent.click(getByText(/confirm/i));

    expect(onSubmit).toBeCalled();
  });
});
