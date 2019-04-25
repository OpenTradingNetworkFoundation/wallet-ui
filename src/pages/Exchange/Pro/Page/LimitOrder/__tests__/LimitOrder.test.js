import React from 'react';
import { cleanup, fireEvent } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';
import { getAssets } from 'src/__fixtures__/assets';
import mouseEvent from 'src/__utils__/mouseEvent';

import LimitOrder from '../index';

const [otn, btc] = getAssets();
const currentOrder = { price: '', amount: 1, total: '' };
describe('<LimitOrder />', () => {
  afterEach(cleanup);
  test('renders', () => {
    const { getByLabelText, getByText } = renderWithRedux(
      <LimitOrder base={otn} quote={btc} currentOrder={currentOrder} />,
      {
        exchangeFee: { isLoading: false, amount: 10000 }
      }
    );
    // displays input fields
    expect(getByLabelText(/price/i)).not.toBeNull();
    expect(getByLabelText(/amount/i)).not.toBeNull();
    expect(getByLabelText(/total/i)).not.toBeNull();

    // displays default amount value as 1
    expect(getByLabelText(/amount/i).value).toBe('1');

    // displays buttons
    expect(getByText(/sell/i)).not.toBeNull();
    expect(getByText(/buy/i)).not.toBeNull();

    // displays balances
    expect(getByText(/1 OTN/i)).not.toBeNull();
    expect(getByText(/0.1 BTC/i)).not.toBeNull();

    // displays fee
    expect(getByText(/< 0.01 %/i)).not.toBeNull();
  });

  test('updates total based on price', () => {
    const updateCurrentOrder = jest.fn();

    const { getByLabelText } = renderWithRedux(
      <LimitOrder
        base={otn}
        quote={btc}
        currentOrder={currentOrder}
        updateCurrentOrder={updateCurrentOrder}
      />,
      {
        exchangeFee: { isLoading: false, amount: 10000 }
      }
    );

    const priceInput = getByLabelText(/price/i);
    priceInput.value = 10;
    fireEvent.change(priceInput);

    expect(updateCurrentOrder).toHaveBeenCalledWith({
      amount: 1,
      price: '10',
      total: '10'
    });
  });

  test('updates amount based on total', () => {
    const updateCurrentOrder = jest.fn();

    const { getByLabelText } = renderWithRedux(
      <LimitOrder
        base={otn}
        quote={btc}
        currentOrder={{ price: '10', amount: 1, total: '' }}
        updateCurrentOrder={updateCurrentOrder}
      />,
      {
        exchangeFee: { isLoading: false, amount: 10000 }
      }
    );

    const amountInput = getByLabelText(/amount/i);
    amountInput.value = 10;
    fireEvent.change(amountInput);
    expect(updateCurrentOrder).toHaveBeenCalledWith({
      price: '10',
      amount: '10',
      total: '100'
    });
  });

  test('validation', () => {
    const { getByText } = renderWithRedux(
      <LimitOrder base={otn} quote={btc} currentOrder={currentOrder} />,
      {
        exchangeFee: { isLoading: false, amount: 10000 }
      }
    );

    expect(getByText(/buy/i).parentElement.hasAttribute('disabled')).toBe(true);
    expect(getByText(/sell/i).parentElement.hasAttribute('disabled')).toBe(
      true
    );

    mouseEvent.mouseEnter(getByText(/buy/i));
    expect(getByText('Price field should not be empty')).not.toBeNull();
  });
});
