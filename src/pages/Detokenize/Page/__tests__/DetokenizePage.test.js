import React from 'react';
import { Aes } from 'bitsharesjs';
import { fireEvent } from 'react-testing-library';

import { getUserAccount } from 'src/__fixtures__/account';
import { getTokenizedAssets, getAssets } from 'src/__fixtures__/assets';
import { renderWithRedux } from 'src/__utils__';
import mockMethod from 'src/__utils__/mockMethod';

import * as feeApi from 'api/feeApi';
import * as accountApi from 'api/accountApi';
import * as gatewayApi from 'api/gatewayApi';

import DetokenizePage from '../index';

const mocks = [
  mockMethod(feeApi, 'getSendFee', () => '10000'),
  mockMethod(Aes, 'encrypt_with_checksum', () => 'mockEncrypt'),
  mockMethod(accountApi, 'getAccountById', getUserAccount),
  mockMethod(gatewayApi, 'validateWithdrawalAddress', ({ address }) => {
    return address === 'valid'
      ? {
          valid: true
        }
      : { valid: false };
  })
];

const getState = () => {
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
    addressValidation: {
      valid: true
    },
    serviceStatus: {
      status: {
        gateway: true
      }
    },
    gateway: {
      gatewayId: null,
      availableAssets: getAssets()
    }
  };
};

describe('<DetokenizePage />', () => {
  afterAll(() => mocks.forEach(mock => mock.mockRestore()));
  test('renders empty', () => {
    const { getByText } = renderWithRedux(
      <div id="modal-container">
        <DetokenizePage />
      </div>,
      {
        serviceStatus: {
          status: {
            gateway: true
          }
        }
      }
    );

    expect(getByText('No assets to be detokenized')).not.toBeNull();
  });

  test('preserves state between confirmation and a form', async () => {
    const { getByText, getByPlaceholderText, getByValue } = renderWithRedux(
      <div id="modal-container">
        <DetokenizePage />
      </div>,
      getState()
    );

    expect(getByText('OTN')).not.toBeNull();
    expect(getByText('Confirm')).not.toBeNull();

    const amountInput = getByPlaceholderText('Enter Amount');
    amountInput.value = 0.5;
    fireEvent.change(amountInput);

    const addressInput = getByPlaceholderText('Enter Address');
    addressInput.value = 'valid';
    fireEvent.change(addressInput);

    fireEvent.click(getByText('Confirm'));
    expect(getByText('0.0001 OTN')).not.toBeNull();
    expect(getByText('Detokenize address')).not.toBeNull();
    expect(getByText('Detokenize')).not.toBeNull();

    fireEvent.click(getByText('back'));

    expect(getByValue('0.5')).not.toBeNull();
    expect(getByValue('valid')).not.toBeNull();
  });

  test('displays an error page', () => {
    const { getByText } = renderWithRedux(
      <div id="modal-container">
        <DetokenizePage />
      </div>,
      {
        serviceStatus: {
          status: {
            gateway: false
          }
        }
      }
    );

    expect(getByText(/Oops/i)).not.toBeNull();
    expect(
      getByText(
        /The operation is suspended due to temporary unavailability of the gateway./i
      )
    ).not.toBeNull();

    expect(getByText(/OK/i)).not.toBeNull();
  });
});
