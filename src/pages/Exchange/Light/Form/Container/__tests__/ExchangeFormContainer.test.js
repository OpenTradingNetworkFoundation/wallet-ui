import React from 'react';
import { pick } from 'lodash';
import { fireEvent, cleanup, waitForElement } from 'react-testing-library';

import * as ordersApi from 'api/ordersApi';
import * as feeApi from 'api/feeApi';

import AssetAmount from 'src/models/AssetAmount';
import { orderBookActions } from 'ducks/order-book';

import { getUserAccount } from 'src/__fixtures__/account';
import { getTokenizedAssets, getAssets } from 'src/__fixtures__/assets';
import { limitOrders } from 'src/__fixtures__/limitOrders';

import { renderWithRedux } from 'src/__utils__';
import mouseEvent from 'src/__utils__/mouseEvent';

import Container from '../index';

const mocks = [
  jest.spyOn(feeApi, 'getExchangeFee').mockImplementation(async () => '10000'),

  jest.spyOn(ordersApi, 'getOrders').mockImplementation(async () => limitOrders)
];

const getExchangeParams = formData => {
  const { feeAsset, fromAsset, toAsset, fromAmount, toAmount } = formData;

  return {
    feeAssetId: feeAsset.id,
    from: {
      amount: AssetAmount.normalize(fromAmount, fromAsset.precision),
      assetId: fromAsset.id
    },
    to: {
      amount: AssetAmount.normalize(toAmount, toAsset.precision),
      assetId: toAsset.id
    }
  };
};

const getState = () => {
  const balances = getTokenizedAssets();

  return {
    balance: {
      isFetching: false,
      assets: balances.map(balance =>
        pick(balance, ['id', 'name', 'asset', 'precision', 'amount'])
      )
    },
    exchangeFee: {
      isLoading: false,
      feeAmount: '10000'
    },
    rates: {
      price: '4000',
      availableAmount: '1000000000',
      isAvailable: true,
      isLoading: false
    },
    account: getUserAccount()
  };
};

describe('<ExchangeFormContainer />', () => {
  afterEach(cleanup);

  afterAll(() => mocks.forEach(mock => mock.mockRestore()));

  describe('change amount', () => {
    test('from amount', async () => {
      const onSubmit = jest.fn();
      const state = getState();

      const {
        container,
        getByText,
        getAllByText,
        getAllByPlaceholderText,
        queryByText
      } = renderWithRedux(
        <Container
          onSubmit={onSubmit}
          getExchangeParams={getExchangeParams}
          queryParams={{ asset: 'OTN' }}
        />,
        state
      );

      expect(container).not.toBeNull();

      expect(getByText('Fee')).not.toBeNull();
      expect(getByText('spinner.svg')).not.toBeNull();

      const fee = await waitForElement(() => getByText('-'), container);

      expect(fee).not.toBeNull();
      expect(queryByText('spinner.svg')).toBeNull();

      const [fromInput, toInput] = getAllByPlaceholderText('Enter Amount');
      fromInput.value = '0.1';
      fireEvent.change(fromInput);

      // check fee panel behavior
      const feePercentages = await waitForElement(
        () => getByText('(0.10%)'),
        container
      );

      expect(feePercentages).not.toBeNull();
      expect(toInput.value).toBe('0.00000956');

      const feeAmount = await waitForElement(
        () => getByText('0.0001 OTN'),
        container
      );

      expect(feeAmount).not.toBeNull();
      expect(getAllByText('otn-coin.svg')).toHaveLength(2);
      expect(getByText('Pay OTN')).not.toBeNull();

      fireEvent.click(getByText('Exchange'));

      const balances = getTokenizedAssets();
      expect(onSubmit).toBeCalledWith({
        fromAmount: '0.1',
        toAmount: '0.00000956',
        fromAsset: balances[0],
        toAsset: balances[1],
        feeAsset: balances[0],
        isDefault: false
      });
    });

    test('to amount', async () => {
      const onSubmit = jest.fn();
      const state = getState();

      const {
        container,
        getByText,
        getAllByText,
        getAllByPlaceholderText,
        queryByText
      } = renderWithRedux(
        <Container
          onSubmit={onSubmit}
          getExchangeParams={getExchangeParams}
          queryParams={{ asset: 'OTN' }}
        />,
        state
      );

      expect(container).not.toBeNull();

      expect(getByText('Fee')).not.toBeNull();
      expect(getByText('spinner.svg')).not.toBeNull();

      const fee = await waitForElement(() => getByText('-'), container);

      expect(fee).not.toBeNull();
      expect(queryByText('spinner.svg')).toBeNull();

      const [fromInput, toInput] = getAllByPlaceholderText('Enter Amount');
      toInput.value = '0.000025';
      fireEvent.change(toInput);

      // check fee panel behavior
      const feePercentages = await waitForElement(
        () => getByText('(0.04%)'),
        container
      );

      expect(feePercentages).not.toBeNull();
      expect(fromInput.value).toBe('0.26126843');

      const feeAmount = await waitForElement(
        () => getByText('0.0001 OTN'),
        container
      );

      expect(feeAmount).not.toBeNull();
      expect(getAllByText('otn-coin.svg')).toHaveLength(2);
      expect(getByText('Pay OTN')).not.toBeNull();

      fireEvent.click(getByText('Exchange'));

      const balances = getTokenizedAssets();
      expect(onSubmit).toBeCalledWith({
        fromAmount: '0.26126843',
        toAmount: '0.000025',
        fromAsset: balances[0],
        toAsset: balances[1],
        feeAsset: balances[0],
        isDefault: false
      });
    });
  });

  describe('change asset', async () => {
    test('fee asset', async () => {
      const onSubmit = jest.fn();
      const state = getState();

      const { container, getByText, getAllByPlaceholderText } = renderWithRedux(
        <Container
          onSubmit={onSubmit}
          getExchangeParams={getExchangeParams}
          queryParams={{ asset: 'OTN' }}
        />,
        state
      );

      expect(container).not.toBeNull();
      await waitForElement(() => getByText('-'), container);

      const [fromInput] = getAllByPlaceholderText('Enter Amount');
      fromInput.value = '0.1';
      fireEvent.change(fromInput);

      await waitForElement(() => getByText('Pay OTN'), container);

      mouseEvent.mouseDown(getByText('Pay OTN'));
      mouseEvent.mouseDown(getByText('OTN.ETH'));

      await waitForElement(() => getByText('0.0001 OTN.ETH'), container);

      expect(getByText('Pay OTN.ETH')).not.toBeNull();

      fireEvent.click(getByText('Exchange'));

      const balances = getTokenizedAssets();
      expect(onSubmit).toBeCalledWith({
        fromAmount: '0.1',
        toAmount: '0.00000956',
        fromAsset: balances[0],
        toAsset: balances[1],
        feeAsset: balances[2],
        isDefault: false
      });
    });
  });

  describe('validation', () => {
    test('from amount', async () => {
      const onSubmit = jest.fn();
      const state = getState();

      const { container, getByText, getAllByPlaceholderText } = renderWithRedux(
        <Container
          onSubmit={onSubmit}
          getExchangeParams={getExchangeParams}
          queryParams={{ asset: 'OTN' }}
        />,
        state
      );

      expect(container).not.toBeNull();
      await waitForElement(() => getByText('-'), container);

      const [fromInput] = getAllByPlaceholderText('Enter Amount');
      fromInput.value = 0;
      fireEvent.change(fromInput);

      expect(getByText('Should be a valid positive number')).not.toBeNull();

      fromInput.value = '';
      fireEvent.change(fromInput);
      fireEvent.focus(fromInput);

      expect(getByText('Amount is required')).not.toBeNull();

      fromInput.value = '10';
      fireEvent.change(fromInput);

      expect(
        getByText(
          'You have insufficient funds. Add 9.0001 or enter another amount'
        )
      ).not.toBeNull();

      fromInput.value = '1000000000000';
      fireEvent.change(fromInput);

      expect(
        getByText(
          'The max amount is "5.74296609". Please reduce the amount by "93855695.24266136".'
        )
      );

      fireEvent.click(getByText('Exchange'));
      expect(onSubmit).not.toBeCalled();
    });

    test('to amount', async () => {
      const onSubmit = jest.fn();
      const state = getState();

      const {
        container,
        getByText,
        getAllByPlaceholderText,
        queryByText
      } = renderWithRedux(
        <Container
          onSubmit={onSubmit}
          getExchangeParams={getExchangeParams}
          queryParams={{ asset: 'OTN' }}
        />,
        state
      );

      expect(container).not.toBeNull();
      await waitForElement(() => getByText('-'), container);

      const [, toInput] = getAllByPlaceholderText('Enter Amount');
      toInput.value = 0;
      fireEvent.change(toInput);

      expect(getByText('Should be a valid positive number')).not.toBeNull();

      toInput.value = '';
      fireEvent.change(toInput);
      fireEvent.focus(toInput);

      expect(getByText('Amount is required')).not.toBeNull();

      toInput.value = '10';
      fireEvent.change(toInput);

      expect(
        queryByText(
          'You have insufficient funds. Add 9.0001 or enter another amount'
        )
      ).toBeNull();

      toInput.value = '1000000000000';
      fireEvent.change(toInput);

      expect(
        getByText(
          'The max amount is "5.74296609". Please reduce the amount by "999999999994.257".'
        )
      );

      fireEvent.click(getByText('Exchange'));
      expect(onSubmit).not.toBeCalled();
    });
  });

  test('should apply form state', async () => {
    const onSubmit = jest.fn();
    const state = getState();

    const balances = getTokenizedAssets();

    const {
      container,
      getByText,
      getAllByText,
      queryByTestId
    } = renderWithRedux(
      <Container
        onSubmit={onSubmit}
        getExchangeParams={getExchangeParams}
        queryParams={{ asset: 'OTN' }}
        formState={{
          fromAmount: '0.123',
          toAmount: '0.456',
          fromAsset: balances[0],
          toAsset: balances[1],
          feeAsset: balances[1]
        }}
      />,
      state
    );

    expect(container).not.toBeNull();

    await waitForElement(() => getByText('-'), container);

    expect(getByText('OTN.BTC')).not.toBeNull();
    expect(getByText('OTN')).not.toBeNull();

    expect(getByText('Bitcoin Tokenized')).not.toBeNull();
    expect(getByText('Open Trading Network')).not.toBeNull();

    expect(getAllByText('wallet-asset.svg')).toHaveLength(2);

    expect(getByText('Available 1 OTN')).not.toBeNull();
    expect(getByText('Available 0.1 OTN.BTC')).not.toBeNull();

    expect(getByText('You will receive at least this amount.')).not.toBeNull();

    expect(getByText('Price 10450.73697532 OTN = 1 BTC'));

    expect(getByText('Fee')).not.toBeNull();

    const fromInput = queryByTestId('from-exchange-input');
    const toInput = queryByTestId('to-exchange-input');

    fireEvent.change(toInput);

    expect(fromInput.value).toBe('0.123');
    expect(toInput.value).toBe('0.456');
  });

  describe('on max click', () => {
    test('from asset', async () => {
      const onSubmit = jest.fn();
      const state = getState();

      const {
        container,
        getByText,
        getAllByText,
        queryByText,
        getAllByPlaceholderText
      } = renderWithRedux(
        <Container
          onSubmit={onSubmit}
          getExchangeParams={getExchangeParams}
          queryParams={{ asset: 'OTN' }}
        />,
        state
      );

      expect(container).not.toBeNull();

      expect(getByText('Fee')).not.toBeNull();
      expect(getByText('spinner.svg')).not.toBeNull();

      const fee = await waitForElement(() => getByText('-'), container);

      expect(fee).not.toBeNull();
      expect(queryByText('spinner.svg')).toBeNull();

      const [fromInput, toInput] = getAllByPlaceholderText('Enter Amount');

      const [fromInputMax] = getAllByText('Max');
      fireEvent.click(fromInputMax);

      // check fee panel behavior
      const feePercentages = await waitForElement(
        () => getByText('(0.01%)'),
        container
      );

      expect(feePercentages).not.toBeNull();
      expect(toInput.value).toBe('0.00009567');
      expect(fromInput.value).toBe('0.9999');

      const feeAmount = await waitForElement(
        () => getByText('0.0001 OTN'),
        container
      );

      expect(feeAmount).not.toBeNull();
      expect(getAllByText('otn-coin.svg')).toHaveLength(2);
      expect(getByText('Pay OTN')).not.toBeNull();

      fireEvent.click(getByText('Exchange'));

      const balances = getTokenizedAssets();
      expect(onSubmit).toBeCalledWith({
        fromAmount: '0.9999',
        toAmount: '0.00009567',
        fromAsset: balances[0],
        toAsset: balances[1],
        feeAsset: balances[0],
        focusedInput: 'fromAmount',
        isDefault: false
      });
    });

    test('toAmount', async () => {
      const onSubmit = jest.fn();
      const state = getState();

      const {
        container,
        getByText,
        getAllByText,
        queryByText,
        getAllByPlaceholderText
      } = renderWithRedux(
        <Container
          onSubmit={onSubmit}
          getExchangeParams={getExchangeParams}
          queryParams={{ asset: 'OTN' }}
        />,
        state
      );

      expect(container).not.toBeNull();

      expect(getByText('Fee')).not.toBeNull();
      expect(getByText('spinner.svg')).not.toBeNull();

      const fee = await waitForElement(() => getByText('-'), container);

      expect(fee).not.toBeNull();
      expect(queryByText('spinner.svg')).toBeNull();

      const [fromInput, toInput] = getAllByPlaceholderText('Enter Amount');

      const [, toInputMax] = getAllByText('Max');
      fireEvent.click(toInputMax);

      // check fee panel behavior
      const feePercentages = await waitForElement(
        () => getByText('(0.01%)'),
        container
      );

      expect(feePercentages).not.toBeNull();
      expect(toInput.value).toBe('0.00009567');
      expect(fromInput.value).toBe('0.9999');

      const feeAmount = await waitForElement(
        () => getByText('0.0001 OTN'),
        container
      );

      expect(feeAmount).not.toBeNull();
      expect(getAllByText('otn-coin.svg')).toHaveLength(2);
      expect(getByText('Pay OTN')).not.toBeNull();

      fireEvent.click(getByText('Exchange'));

      const balances = getTokenizedAssets();
      expect(onSubmit).toBeCalledWith({
        fromAmount: '0.9999',
        toAmount: '0.00009567',
        fromAsset: balances[0],
        focusedInput: 'toAmount',
        toAsset: balances[1],
        feeAsset: balances[0],
        isDefault: false
      });
    });
  });

  describe('exchange assets', () => {
    test('disabled', () => {
      const onSubmit = jest.fn();
      const state = getState();

      const btc = state.balance.assets.find(asset => asset.name === 'BTC');
      btc.amount = 0;

      const { container, getByText } = renderWithRedux(
        <Container
          onSubmit={onSubmit}
          getExchangeParams={getExchangeParams}
          queryParams={{ asset: 'OTN' }}
        />,
        state
      );

      expect(container).not.toBeNull();

      expect(getByText('Price 4000 OTN = 1 BTC'));

      const exchangeButton = getByText('exchange-icon-blue.svg');
      fireEvent.click(exchangeButton);

      expect(getByText('Price 4000 OTN = 1 BTC'));
    });

    test('enabled', async () => {
      const onSubmit = jest.fn();
      const state = getState();

      const {
        container,
        getByText,
        getAllByPlaceholderText,
        queryByTestId
      } = renderWithRedux(
        <Container
          onSubmit={onSubmit}
          getExchangeParams={getExchangeParams}
          queryParams={{ asset: 'OTN' }}
        />,
        state
      );

      expect(container).not.toBeNull();

      expect(getByText('Price 4000 OTN = 1 BTC'));

      await waitForElement(() => getByText('-'), container);

      const [fromInput, toInput] = getAllByPlaceholderText('Enter Amount');
      fromInput.value = '0.1';
      fireEvent.change(fromInput);

      const exchangeButton = getByText('exchange-icon-blue.svg');
      fireEvent.click(exchangeButton);

      expect(getByText('Price 10450.73697532 BTC = 1 OTN'));

      expect(fromInput.value).toBe('0.00000956');
      expect(toInput.value).toBe('0.1');

      const rightLabel = queryByTestId('asset-name-OTN').innerHTML;
      expect(rightLabel).toBe('Open Trading Network');

      const leftLabel = queryByTestId('asset-name-BTC').innerHTML;
      expect(leftLabel).toBe('Bitcoin Tokenized');
    });
  });

  describe('update price', () => {
    test('if fromInput is focused toInput updates on price update', async () => {
      const onSubmit = jest.fn();

      const { container, getByText, getAllByPlaceholderText } = renderWithRedux(
        <Container
          onSubmit={onSubmit}
          getExchangeParams={getExchangeParams}
          queryParams={{ asset: 'OTN' }}
        />,
        getState()
      );
      await waitForElement(() => getByText('-'), container);
      const [fromInput, toInput] = getAllByPlaceholderText('Enter Amount');
      fromInput.value = '10';
      fireEvent.change(fromInput);
      fireEvent.focus(fromInput);

      expect(toInput.value).toBe('0.00095687');

      expect(fromInput.value).toBe('10');
    });

    test('if toInput is focused fromInput updates on price update', async () => {
      const onSubmit = jest.fn();

      const { container, getByText, getAllByPlaceholderText } = renderWithRedux(
        <Container
          onSubmit={onSubmit}
          getExchangeParams={getExchangeParams}
          queryParams={{ asset: 'OTN' }}
        />,
        getState()
      );
      await waitForElement(() => getByText('-'), container);
      const [fromInput, toInput] = getAllByPlaceholderText('Enter Amount');
      toInput.value = '10';
      fireEvent.change(toInput);
      fireEvent.focus(toInput);

      expect(fromInput.value).toBe('104507.3697532');

      expect(toInput.value).toBe('10');
      expect(fromInput.value).toBe('104507.3697532');
    });

    test('swapping assets swaps focus correctly', async () => {
      const onSubmit = jest.fn();

      const {
        container,
        getByText,
        getAllByPlaceholderText,
        getByTestId,
        store
      } = renderWithRedux(
        <Container
          onSubmit={onSubmit}
          getExchangeParams={getExchangeParams}
          queryParams={{ asset: 'OTN' }}
        />,
        getState()
      );
      await waitForElement(() => getByText('-'), container);
      const [fromInput, toInput] = getAllByPlaceholderText('Enter Amount');
      fromInput.value = '10';
      fireEvent.change(fromInput);
      fireEvent.focus(fromInput);

      expect(fromInput.value).toBe('10');
      expect(toInput.value).toBe('0.00095687');

      const exchangeButton = getByTestId('exchange-icon-container');
      fireEvent.click(exchangeButton);

      expect(fromInput.value).toBe('0.00095687');
      expect(toInput.value).toBe('10');

      store.dispatch(
        orderBookActions.limitOrdersSuccess({
          baseId: getAssets()[0].id,
          quoteId: getAssets()[1].id,
          limitOrders,
          toAmount: '10'
        })
      );

      expect(fromInput.value).toBe('0.00095687');
      expect(toInput.value).toBe('10');
    });

    test('clicking max affects active state', async () => {
      const onSubmit = jest.fn();

      const {
        container,
        getByText,
        getAllByText,
        getAllByPlaceholderText,
        store
      } = renderWithRedux(
        <Container
          onSubmit={onSubmit}
          getExchangeParams={getExchangeParams}
          queryParams={{ asset: 'OTN' }}
        />,
        getState()
      );
      await waitForElement(() => getByText('-'), container);

      const [fromMaxBtn] = getAllByText('Max');
      fireEvent.click(fromMaxBtn);

      const [fromInput, toInput] = getAllByPlaceholderText('Enter Amount');

      expect(fromInput.value).toBe('0.9999');
      expect(toInput.value).toBe('0.00009567');

      store.dispatch(
        orderBookActions.limitOrdersSuccess({
          baseId: getAssets()[0].id,
          quoteId: getAssets()[1].id,
          limitOrders,
          toAmount: '0.00009567'
        })
      );

      expect(fromInput.value).toBe('0.9999');
      expect(expect(toInput.value).toBe('0.00009567'));
    });
  });

  describe('render', () => {
    test('should render properly', async () => {
      const onSubmit = jest.fn();
      const state = getState();

      const {
        container,
        getByText,
        getAllByText,
        queryByText
      } = renderWithRedux(
        <Container
          onSubmit={onSubmit}
          getExchangeParams={getExchangeParams}
          queryParams={{ asset: 'OTN' }}
        />,
        state
      );

      expect(container).not.toBeNull();

      expect(getByText('exchange-icon-blue.svg')).not.toBeNull();

      expect(getByText('OTN.BTC')).not.toBeNull();
      expect(getByText('OTN')).not.toBeNull();

      expect(getByText('Bitcoin Tokenized')).not.toBeNull();
      expect(getByText('Open Trading Network')).not.toBeNull();

      expect(getAllByText('wallet-asset.svg')).toHaveLength(2);

      expect(getByText('Available 0.9999 OTN')).not.toBeNull();
      expect(getByText('Available 0.1 OTN.BTC')).not.toBeNull();

      expect(
        getByText('You will receive at least this amount.')
      ).not.toBeNull();

      expect(getByText('Price 4000 OTN = 1 BTC'));

      expect(getByText('Fee')).not.toBeNull();
      expect(getByText('spinner.svg')).not.toBeNull();

      const fee = await waitForElement(() => getByText('-'), container);

      expect(fee).not.toBeNull();
      expect(queryByText('spinner.svg')).toBeNull();
    });

    test('price is unavailable', () => {
      const onSubmit = jest.fn();
      const state = {
        ...getState(),
        rates: {
          price: null,
          availableAmount: '1000000000',
          isAvailable: false,
          isLoading: false
        }
      };

      const { container, getByText } = renderWithRedux(
        <Container
          onSubmit={onSubmit}
          getExchangeParams={getExchangeParams}
          queryParams={{ asset: 'OTN' }}
        />,
        state
      );

      expect(container).not.toBeNull();

      expect(getByText('Price Temporarily Unavailable')).not.toBeNull();
    });
  });
});
