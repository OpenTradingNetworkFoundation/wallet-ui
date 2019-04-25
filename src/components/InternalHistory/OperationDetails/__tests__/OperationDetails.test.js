import React from 'react';
import { fireEvent, cleanup } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';

import OperationDetails from '../index';

describe('<InternalOperationDetails />', () => {
  afterEach(cleanup);

  test('renders outgoing', () => {
    const { queryByText } = renderWithRedux(
      <OperationDetails
        operation={{
          id: '1.11.589459',
          confirmations: 25,
          fee: { amount: '1', asset: { displayName: 'OTN' } },
          amount: { amount: '10', asset: { displayName: 'OTN' } },
          internalState: 'pending',
          internalType: 'send',
          to: {
            name: 'vasya'
          },
          from: {
            name: 'misha'
          }
        }}
      />
    );
    expect(queryByText(/operation id/i)).not.toBeNull();
    expect(queryByText(/1.11.589459/i)).not.toBeNull();
    expect(queryByText(/sent to/i)).not.toBeNull();
    expect(queryByText(/vasya/i)).not.toBeNull();
    expect(queryByText(/1 OTN/i)).not.toBeNull();
    expect(queryByText(/10.00%/i)).not.toBeNull();
  });

  test('renders incoming', () => {
    const { queryByText } = renderWithRedux(
      <OperationDetails
        operation={{
          id: '1.11.589459',
          confirmations: 25,
          fee: { amount: '1', asset: { displayName: 'OTN' } },
          amount: { amount: '10', asset: { displayName: 'OTN' } },
          internalState: 'pending',
          internalType: 'receive',
          to: {
            name: 'vasya'
          },
          from: {
            name: 'misha'
          }
        }}
      />
    );
    expect(queryByText(/operation id/i)).not.toBeNull();
    expect(queryByText(/1.11.589459/i)).not.toBeNull();
    expect(queryByText(/receive from/i)).not.toBeNull();
    expect(queryByText(/misha/i)).not.toBeNull();
    expect(queryByText(/1 OTN/i)).not.toBeNull();
    expect(queryByText(/10.00%/i)).not.toBeNull();
  });

  test('renders exchange', () => {
    const { queryByText } = renderWithRedux(
      <OperationDetails
        operation={{
          id: '1.11.589459',
          confirmations: 25,
          fee: { amount: '1', asset: { displayName: 'OTN' } },
          internalState: 'pending',
          internalType: 'exchange-in',
          amount: {
            amount: '10',
            asset: { displayName: 'OTN' }
          },
          pays: {
            amount: '10',
            asset: { displayName: 'OTN' }
          },
          receives: {
            amount: '10',
            asset: { displayName: 'OTN.BTC' }
          }
        }}
      />
    );
    expect(queryByText(/operation id/i)).not.toBeNull();
    expect(queryByText(/1.11.589459/i)).not.toBeNull();
    expect(queryByText(/give/i)).not.toBeNull();
    expect(queryByText(/1 OTN/i)).not.toBeNull();
    expect(queryByText(/get/i)).not.toBeNull();
    expect(queryByText(/10 OTN.BTC/i)).not.toBeNull();
    expect(queryByText(/10.00%/i)).not.toBeNull();
  });

  test('displays success for pending operation', () => {
    const { queryByText } = renderWithRedux(
      <OperationDetails
        operation={{
          confirmations: 25,
          fee: { amount: '1', asset: { displayName: 'OTN' } },
          amount: { amount: '10', asset: { displayName: 'OTN' } },
          internalState: 'pending'
        }}
      />
    );

    expect(queryByText(/success/i)).not.toBeNull();
  });

  test('displays confirmed for processed operation', () => {
    const { queryByText } = renderWithRedux(
      <OperationDetails
        operation={{
          confirmations: 25,
          fee: { amount: '1', asset: { displayName: 'OTN' } },
          amount: { amount: '10', asset: { displayName: 'OTN' } },
          internalState: 'processed',
          isIrreversible: true
        }}
      />
    );

    expect(queryByText(/confirmed/i)).not.toBeNull();
  });

  test('hovering tooltip renders description for success', () => {
    const { queryByText } = renderWithRedux(
      <OperationDetails
        operation={{
          confirmations: 25,
          fee: { amount: '1', asset: { displayName: 'OTN' } },
          amount: { amount: '10', asset: { displayName: 'OTN' } },
          internalState: 'pending'
        }}
      />
    );
    const tooltip = queryByText('question.svg');
    fireEvent.mouseEnter(tooltip);
    expect(
      queryByText(/Success means that this block was not yet confirmed/i)
    ).not.toBeNull();
  });

  test('hovering tooltip renders description for confirmed', () => {
    const { queryByText } = renderWithRedux(
      <OperationDetails
        operation={{
          fee: { amount: '1', asset: { displayName: 'OTN' } },
          amount: { amount: '10', asset: { displayName: 'OTN' } },
          internalState: 'processed',
          isIrreversible: true
        }}
      />
    );
    const tooltip = queryByText('question.svg');
    fireEvent.mouseEnter(tooltip);

    expect(
      queryByText(/Confirmed means that this block was confirmed/i)
    ).not.toBeNull();
  });
});
