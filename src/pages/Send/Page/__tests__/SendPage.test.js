import React from 'react';
import { fireEvent, wait } from 'react-testing-library';
import { renderWithRedux } from 'src/__utils__';

import SendPage from '../index';

describe('A <SendPage />', () => {
  test('renders a placeholder', () => {
    const { getByText } = renderWithRedux(
      <div id="modal-container">
        <SendPage />
      </div>
    );

    expect(getByText(/no assets/i)).not.toBeNull();
  });

  test('renders a confirmation', async () => {
    const { getByText, getByPlaceholderText } = renderWithRedux(
      <div id="modal-container">
        <SendPage />
      </div>,
      {
        balance: {
          isFetching: false,
          assets: [
            {
              id: '1.3.0',
              amount: 9999799980000,
              asset: 'OTN',
              name: 'OTN',
              precision: 8
            },
            {
              id: '1.3.1',
              amount: 999979998,
              asset: 'BTC',
              name: 'BTC',
              precision: 8
            }
          ]
        },
        userLookUp: {
          account: {
            name: 'test'
          }
        },
        account: {
          name: 'mister'
        }
      }
    );

    const amount = getByPlaceholderText(/enter amount/i);
    amount.value = 15;
    fireEvent.change(amount);

    const user = getByPlaceholderText(/user name/i);
    user.value = 'test';
    fireEvent.change(user);

    await wait();

    fireEvent.click(getByText('Confirm'));

    const sendButton = getByText('Send');

    expect(sendButton).not.toBeNull();
  });
});
