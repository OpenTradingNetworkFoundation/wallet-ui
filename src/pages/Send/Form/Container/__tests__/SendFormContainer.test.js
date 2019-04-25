import React from 'react';
import { fireEvent, cleanup, wait } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';
import cleanMocks from 'src/__utils__/cleanMocks';
import mockMethod from 'src/__utils__/mockMethod';
import { getUserAccount } from 'src/__fixtures__/account';

import * as accountApi from 'api/accountApi';

import Container from '../index';

const mocks = [
  jest.mock('lodash/debounce', () => jest.fn(fn => fn)),
  mockMethod(accountApi, 'getAccountById', getUserAccount),
  mockMethod(
    accountApi,
    'getAccountByName',
    name => (name === 'passing name' ? getUserAccount() : null)
  )
];

describe('A <SendFormContainer />', () => {
  afterEach(cleanup);
  afterAll(() => cleanMocks(mocks));

  it('should work properly', async () => {
    const { getByText, queryByText, getByPlaceholderText } = renderWithRedux(
      <Container queryParams={{ asset: 'OTN' }} />,
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
        account: { id: '1', name: 'master' }
      }
    );

    const amount = getByPlaceholderText(/Enter Amount/i);
    const userName = getByPlaceholderText(/user name/i);

    amount.value = 1000000000000000000;
    fireEvent.change(amount);
    expect(getByText(/insufficient funds/i)).not.toBeNull();

    userName.value = 'faucet';
    fireEvent.change(userName);

    expect(queryByText(/This account does not exist/i)).not.toBeNull();

    userName.value = 'master';
    fireEvent.change(userName);

    expect(queryByText(/You can't send funds to yourself/i)).not.toBeNull();

    userName.value = 'passing name';
    fireEvent.change(userName);

    amount.value = 10;
    fireEvent.change(amount);

    await wait(() =>
      expect(queryByText(/This account does not exist/i)).toBeNull()
    );

    expect(queryByText(/You can't send funds to yourself/i)).toBeNull();
  });
});
