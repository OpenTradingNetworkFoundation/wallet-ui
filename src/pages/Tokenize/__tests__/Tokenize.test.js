import React from 'react';
import { cleanup } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';
import { getUserAccount } from 'src/__fixtures__/account';
import { getAssets, getTokenizedAssets } from 'src/__fixtures__/assets';
import mockMethod from 'src/__utils__/mockMethod';
import mouseEvent from 'src/__utils__/mouseEvent';

import * as gatewayApi from 'api/gatewayApi';

import Tokenize from '../Page';

mockMethod(gatewayApi, 'getDepositAddress', (accountId, asset) => ({
  address: `addressFor${asset}`
}));

describe('<Tokenize />', () => {
  const { getByText, getByTestId } = renderWithRedux(
    <div id="modal-container">
      <Tokenize />
    </div>,
    {
      account: getUserAccount(),
      balance: {
        assets: getTokenizedAssets()
      },
      gateway: {
        availableAssets: getAssets()
      },
      serviceStatus: {
        status: {
          gateway: true
        }
      }
    }
  );

  test('render', () => {
    expect(getByTestId('tokenize-form')).not.toBeNull();
  });

  test('displays asset selector', () => {
    expect(getByText('OTN')).not.toBeNull();
  });

  test('displays minimum value warning', () => {
    expect(
      getByText('Minimum value to tokenize is 0.00000001 OTN.')
    ).not.toBeNull();
  });

  test('displays address', () => {
    expect(getByText('addressForOTN')).not.toBeNull();
  });

  test('displays warning for external transactions', () => {
    expect(
      getByText(/Please check the external transaction carefully./i)
    ).not.toBeNull();
  });

  test('displays warning for prod', () => {
    expect(getByText(/Please, don’t send your real tokens/i)).not.toBeNull();
  });

  test('changes asset', () => {
    const assetSelect = getByText('OTN');

    mouseEvent.mouseDown(assetSelect);

    const btcSelect = getByText('Bitcoin');
    mouseEvent.mouseDown(btcSelect);

    expect(getByText('addressForBTC')).not.toBeNull();
  });

  test('renders qr code', () => {
    expect(getByTestId('qr-code')).not.toBeNull();
  });

  test('displays an error page', () => {
    const { getByText } = renderWithRedux(
      <div id="modal-container">
        <Tokenize />
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

  test('displays an error page', () => {
    cleanup();
    const { queryByTestId } = renderWithRedux(
      <div id="modal-container">
        <Tokenize />
      </div>,
      {
        balance: { assets: [] },
        gateway: { availableAssets: [] },
        serviceStatus: {
          status: {
            gateway: true
          }
        }
      }
    );

    expect(queryByTestId('tokenize-form')).toBeNull();
  });
});
