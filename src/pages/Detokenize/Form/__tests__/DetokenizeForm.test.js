import React from 'react';
import { Aes } from 'bitsharesjs';

import { waitForElement, cleanup, fireEvent } from 'react-testing-library';

import { getTokenizedAssets, getAssets } from 'src/__fixtures__/assets';
import { getUserAccount } from 'src/__fixtures__/account';

import { renderWithRedux } from 'src/__utils__';
import mouseEvent from 'src/__utils__/mouseEvent';

import * as feeApi from 'api/feeApi';
import * as accountApi from 'api/accountApi';
import * as env from 'utils/env';
import * as gatewayApi from 'api/gatewayApi';
import mockMethod from 'src/__utils__/mockMethod';

import DetokenizeForm from '../Container';

const mocks = [
  jest.mock('lodash/debounce', () => jest.fn(fn => fn)),
  mockMethod(feeApi, 'getSendFee', async () => '10000'),
  mockMethod(accountApi, 'getAccountById', getUserAccount),
  mockMethod(Aes, 'encrypt_with_checksum', () => 'mockEncrypt'),
  mockMethod(gatewayApi, 'validateWithdrawalAddress', ({ address }) => {
    return address === 'valid'
      ? {
          valid: true
        }
      : { valid: false };
  })
];

const getByName = (name, assets) => assets.find(asset => asset.name === name);

const getState = (isAssetSupported = true) => {
  return {
    balance: {
      assets: getTokenizedAssets()
    },
    fee: {
      feeAmount: '10000',
      isLoading: false
    },
    gatewayFee: {
      isLoading: false,
      fee: {
        '1.3.2': '2600',
        '1.3.0': '1350000',
        '1.3.4': '100000',
        '1.3.5': '51600',
        '1.3.6': '2600',
        '1.3.7': '2600',
        '1.3.8': '420000',
        '1.3.9': '5800000',
        '1.3.10': '12000000',
        '1.3.12': '4600000',
        '1.3.3': '21000'
      }
    },
    account: getUserAccount(),
    gateway: {
      gatewayId: null,
      availableAssets: isAssetSupported ? getAssets() : []
    }
  };
};

describe('<DetokenizeForm />', () => {
  afterEach(cleanup);
  afterAll(() => mocks.forEach(mock => mock.mockRestore()));

  test('renders', () => {
    renderWithRedux(
      <DetokenizeForm
        queryParams={{ asset: 'OTN' }}
        defaultFormState={{
          asset: getByName('OTN', getTokenizedAssets()),
          feeAsset: getByName('OTN', getTokenizedAssets()),
          address: '',
          amount: ''
        }}
      />,
      getState()
    );
  });

  test('displays gateway fee', async () => {
    const { getByText, container } = renderWithRedux(
      <DetokenizeForm
        queryParams={{ asset: 'OTN' }}
        defaultFormState={{
          asset: getByName('OTN', getTokenizedAssets()),
          feeAsset: getByName('OTN', getTokenizedAssets()),
          address: '',
          amount: ''
        }}
      />,
      getState()
    );

    await waitForElement(() => getByText('-'), container);
    expect(getByText('You will pay an additional gateway fee')).not.toBeNull();
    expect(getByText('0.0135 OTN')).not.toBeNull();
  });

  test('displays max amount to detokenize subtracting fee', async () => {
    const { getByText, container, getByPlaceholderText } = renderWithRedux(
      <DetokenizeForm
        queryParams={{ asset: 'OTN' }}
        defaultFormState={{
          asset: getByName('OTN', getTokenizedAssets()),
          feeAsset: getByName('OTN', getTokenizedAssets()),
          address: '',
          amount: ''
        }}
        feeAssets={getTokenizedAssets()}
      />,
      getState()
    );

    await waitForElement(() => getByText('-'), container);

    expect(getByText('Max amount to detokenize: 0.9999 OTN')).not.toBeNull();

    const amountInput = getByPlaceholderText('Enter Amount');
    amountInput.value = 0.5;
    fireEvent.change(amountInput);

    const feeSelector = getByText('Pay OTN');
    mouseEvent.mouseDown(feeSelector);

    const btcFeeSelector = getByText('OTN.BTC');
    mouseEvent.mouseDown(btcFeeSelector);

    expect(getByText('Max amount to detokenize: 1 OTN')).not.toBeNull();
  });

  test('updates fee based on amount', async () => {
    const { getByText, getByPlaceholderText, container } = renderWithRedux(
      <DetokenizeForm
        queryParams={{ asset: 'OTN' }}
        defaultFormState={{
          asset: getByName('OTN', getTokenizedAssets()),
          feeAsset: getByName('OTN', getTokenizedAssets()),
          address: '',
          amount: ''
        }}
      />,
      getState()
    );

    await waitForElement(() => getByText('-'), container);
    const amountInput = getByPlaceholderText('Enter Amount');
    amountInput.value = 0.5;
    fireEvent.change(amountInput);

    const fee = await waitForElement(() => getByText('0.0001 OTN'), container);
    expect(fee).not.toBeNull();
  });

  test('updates external fee and max amount based on asset', async () => {
    const { getByText, container } = renderWithRedux(
      <DetokenizeForm
        queryParams={{ asset: 'OTN' }}
        defaultFormState={{
          asset: getByName('OTN', getTokenizedAssets()),
          feeAsset: getByName('OTN', getTokenizedAssets()),
          address: '',
          amount: ''
        }}
        availableAssets={getTokenizedAssets()}
        feeAssets={getTokenizedAssets()}
      />,
      getState()
    );

    await waitForElement(() => getByText('-'), container);
    expect(getByText('OTN')).not.toBeNull();
    expect(getByText('Max amount to detokenize: 0.9999 OTN')).not.toBeNull();
    expect(getByText('You will pay an additional gateway fee')).not.toBeNull();
    expect(getByText('0.0135 OTN')).not.toBeNull();

    mouseEvent.mouseDown(getByText('OTN'));
    mouseEvent.mouseDown(getByText('OTN.BTC'));
    await waitForElement(() => getByText('-'), container);

    expect(getByText('OTN.BTC')).not.toBeNull();
    expect(getByText('Max amount to detokenize: 0.1 OTN.BTC')).not.toBeNull();
    expect(getByText('You will pay an additional gateway fee')).not.toBeNull();
    expect(getByText('0.000026 OTN.BTC')).not.toBeNull();
  });

  test('validation', async () => {
    const {
      getByText,
      container,
      getByPlaceholderText,
      queryByText
    } = renderWithRedux(
      <DetokenizeForm
        queryParams={{ asset: 'OTN' }}
        defaultFormState={{
          asset: getByName('OTN', getTokenizedAssets()),
          feeAsset: getByName('OTN', getTokenizedAssets()),
          address: '',
          amount: ''
        }}
        availableAssets={getTokenizedAssets()}
        feeAssets={getTokenizedAssets()}
      />,
      getState()
    );

    await waitForElement(() => getByText('-'), container);

    const amountInput = getByPlaceholderText('Enter Amount');
    amountInput.value = 2;
    fireEvent.change(amountInput);

    expect(
      getByText(
        'You have insufficient funds. Add 1.0001 or enter another amount'
      )
    ).not.toBeNull();

    const addressInput = getByPlaceholderText('Enter Address');
    addressInput.value = 'invalid';
    fireEvent.change(addressInput);

    expect(getByText('Address is not valid')).not.toBeNull();

    addressInput.value = 'valid';
    fireEvent.change(addressInput);

    expect(queryByText('Address is not valid')).toBeNull();
  });

  test('renders with user defined asset, but then removes it from the list', async () => {
    const { queryByText } = renderWithRedux(
      <DetokenizeForm
        queryParams={{ asset: 'OTN.BTG' }}
        defaultFormState={{
          asset: getByName('OTN', getTokenizedAssets()),
          feeAsset: getByName('OTN', getTokenizedAssets()),
          address: '',
          amount: ''
        }}
        availableAssets={getTokenizedAssets().slice(0, 3)}
        feeAssets={getTokenizedAssets()}
      />,
      getState()
    );

    // error in query parameters was handled properly
    expect(queryByText('OTN.BTG')).not.toBeNull();
    // open the dropdown
    mouseEvent.mouseDown(queryByText('OTN.BTG'));
    // select OTN
    mouseEvent.mouseDown(queryByText('OTN'));
    // open the dropdown again
    mouseEvent.mouseDown(queryByText('OTN'));

    expect(queryByText('OTN.BTG')).toBeNull();
  });

  test('submits a form', async () => {
    const onSubmit = jest.fn();

    const { getByText, getByPlaceholderText, container } = renderWithRedux(
      <DetokenizeForm
        queryParams={{ asset: 'OTN' }}
        defaultFormState={{
          asset: getByName('OTN', getTokenizedAssets()),
          feeAsset: getByName('OTN', getTokenizedAssets()),
          address: '',
          amount: ''
        }}
        onSubmit={onSubmit}
      />,
      getState()
    );

    await waitForElement(() => getByText('-'), container);

    const amountInput = getByPlaceholderText('Enter Amount');
    amountInput.value = 0.5;
    fireEvent.change(amountInput);

    const addressInput = getByPlaceholderText('Enter Address');
    addressInput.value = 'valid';
    fireEvent.change(addressInput);

    const confirmButton = getByText('Confirm');

    fireEvent.click(confirmButton);

    expect(onSubmit).toHaveBeenCalledWith(
      {
        address: 'valid',
        amount: '0.5',
        asset: {
          amount: 100000000,
          asset: 'OTN',
          displayAmount: '1',
          displayName: 'OTN',
          fullName: 'Open Trading Network',
          id: '1.3.0',
          isCore: true,
          isTokenized: false,
          name: 'OTN',
          precision: 8
        },
        feeAsset: {
          amount: 100000000,
          asset: 'OTN',
          displayAmount: '1',
          displayName: 'OTN',
          fullName: 'Open Trading Network',
          id: '1.3.0',
          isCore: true,
          isTokenized: false,
          name: 'OTN',
          precision: 8
        },
        isDefault: false
      },
      {
        amount: '0.5',
        asset: {
          amount: 100000000,
          asset: 'OTN',
          displayAmount: '1',
          displayName: 'OTN',
          fullName: 'Open Trading Network',
          id: '1.3.0',
          isCore: true,
          isTokenized: false,
          name: 'OTN',
          precision: 8
        },
        feeAsset: {
          amount: 100000000,
          asset: 'OTN',
          displayAmount: '1',
          displayName: 'OTN',
          fullName: 'Open Trading Network',
          id: '1.3.0',
          isCore: true,
          isTokenized: false,
          name: 'OTN',
          precision: 8
        },
        message: { address: 'valid', type: 'withdrawal' },
        recipientId: null
      },
      { amount: '0.5', feeAmount: '0.0001' }
    );
  });

  test('displays placeholder if asset is not supported by gateway', () => {
    const { getByText } = renderWithRedux(
      <DetokenizeForm
        queryParams={{ asset: 'OTN' }}
        defaultFormState={{
          asset: getByName('OTN', getTokenizedAssets()),
          feeAsset: getByName('OTN', getTokenizedAssets()),
          address: '',
          amount: ''
        }}
      />,
      getState(false)
    );

    expect(
      getByText(/Detokenization for this asset is not supported/i)
    ).not.toBeNull();
    expect(getByText(/Please check back later/i)).not.toBeNull();
  });

  describe('warning message', () => {
    test('displays for development', () => {
      const mock = jest.spyOn(env, 'isProd').mockImplementation(() => false);

      const { queryByText } = renderWithRedux(
        <DetokenizeForm
          queryParams={{ asset: 'OTN.BTG' }}
          defaultFormState={{
            asset: getByName('OTN', getTokenizedAssets()),
            feeAsset: getByName('OTN', getTokenizedAssets()),
            address: '',
            amount: ''
          }}
          availableAssets={getTokenizedAssets().slice(0, 3)}
          feeAssets={getTokenizedAssets()}
        />,
        getState()
      );
      expect(
        queryByText('Please, withdraw your tokens to testnet addresses only.')
      ).not.toBeNull();

      mock.mockClear();
    });

    test('doesnt display for prod', () => {
      const mock = jest.spyOn(env, 'isProd').mockImplementation(() => true);

      const { queryByText } = renderWithRedux(
        <DetokenizeForm
          queryParams={{ asset: 'OTN.BTG' }}
          defaultFormState={{
            asset: getByName('OTN', getTokenizedAssets()),
            feeAsset: getByName('OTN', getTokenizedAssets()),
            address: '',
            amount: ''
          }}
          availableAssets={getTokenizedAssets().slice(0, 3)}
          feeAssets={getTokenizedAssets()}
        />,
        getState()
      );
      expect(
        queryByText('Please, withdraw your tokens to testnet addresses only.')
      ).toBeNull();

      mock.mockClear();
    });
  });
});
