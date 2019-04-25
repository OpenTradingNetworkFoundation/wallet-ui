import React from 'react';
import { fireEvent, cleanup } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';
import { getTokenizedAssetByName } from 'src/__fixtures__/assets';

import Container from '../index';

const state = {
  account: {
    name: 'test-account-name'
  }
};

const testRender = (
  memo,
  asset = getTokenizedAssetByName('ETH'),
  feeAsset = getTokenizedAssetByName('ETH')
) => {
  const data = {
    amount: '1.23',
    asset,
    feeAmount: '0.45',
    feeAsset,
    username: 'recepient-account',
    memo
  };

  const { container, queryByText } = renderWithRedux(
    <Container data={data} />,
    state
  );

  expect(container).not.toBeNull();

  expect(queryByText('Asset')).not.toBeNull();
  expect(queryByText('From')).not.toBeNull();
  expect(queryByText('To')).not.toBeNull();
  expect(queryByText('Amount')).not.toBeNull();
  expect(queryByText('Fee')).not.toBeNull();

  expect(queryByText(asset.displayName)).not.toBeNull();
  expect(queryByText(`${asset.asset.toLowerCase()}-coin.svg`)).not.toBeNull();
  expect(queryByText(asset.fullName)).not.toBeNull();

  expect(queryByText('test-account-name')).not.toBeNull();
  expect(queryByText('recepient-account')).not.toBeNull();
  expect(queryByText('1.23')).not.toBeNull();
  expect(queryByText('0.45 OTN.ETH')).not.toBeNull();

  expect(queryByText(/back/i)).not.toBeNull();
  expect(queryByText(/send/i)).not.toBeNull();

  if (memo) {
    expect(queryByText('Message')).not.toBeNull();
    expect(queryByText(memo)).not.toBeNull();
  }

  if (asset.id === feeAsset.id) {
    expect(queryByText('(36.59%)')).not.toBeNull();
  } else {
    expect(queryByText('-')).not.toBeNull();
  }
};

describe('<SendConfirmationContainer />', () => {
  afterEach(cleanup);

  describe('render', () => {
    test('without memo', () => {
      testRender();
    });

    test('with memo', () => {
      testRender('long long memo message');
    });

    test('feeAsset !== asset', () => {
      testRender('long long memo message', getTokenizedAssetByName('OTN'));
    });
  });

  describe('logic', () => {
    test('onConfirm', () => {
      const data = {
        amount: '1.23',
        asset: getTokenizedAssetByName('ETH'),
        feeAmount: '0.45',
        feeAsset: getTokenizedAssetByName('ETH'),
        username: 'recepient-account',
        memo: ''
      };

      const onConfirm = jest.fn();

      const { container, queryByText } = renderWithRedux(
        <Container data={data} onConfirm={onConfirm} />,
        state
      );

      expect(container).not.toBeNull();

      fireEvent.click(queryByText('Send'));

      expect(onConfirm).toBeCalled();
    });

    test('onBack', () => {
      const data = {
        amount: '1.23',
        asset: getTokenizedAssetByName('ETH'),
        feeAmount: '0.45',
        feeAsset: getTokenizedAssetByName('ETH'),
        username: 'recepient-account',
        memo: ''
      };

      const onBack = jest.fn();

      const { container, queryByText } = renderWithRedux(
        <Container data={data} onBack={onBack} />,
        state
      );

      expect(container).not.toBeNull();

      fireEvent.click(queryByText('back'));

      expect(onBack).toBeCalled();
    });
  });
});
