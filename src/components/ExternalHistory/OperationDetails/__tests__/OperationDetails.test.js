import React from 'react';
import { cleanup } from 'react-testing-library';
import { renderWithRedux } from 'src/__utils__';

import Details from '../index';

describe('<ExternalOperationDetails />', () => {
  afterEach(cleanup);
  test('renders pending operation', () => {
    const { getByText } = renderWithRedux(
      <Details
        operation={{
          confirmations: 25,
          fee: { amount: '1', asset: { displayName: 'OTN' } },
          amount: { amount: '10', asset: { displayName: 'OTN' } },
          internalState: 'pending'
        }}
      />
    );

    expect(getByText(/1 OTN/i)).not.toBeNull();
    expect(getByText('(10.00%)')).not.toBeNull();
    expect(getByText(/25/)).not.toBeNull();
    expect(getByText('Pending')).not.toBeNull();
  });

  test('renders pending operation', () => {
    const { getByText } = renderWithRedux(
      <Details
        operation={{
          confirmations: 0,
          fee: { amount: '1', asset: { displayName: 'OTN' } },
          amount: { amount: '10', asset: { displayName: 'OTN' } },
          internalState: 'confirmed'
        }}
      />
    );

    expect(getByText('Confirmed')).not.toBeNull();
  });

  test('renders pending operation', () => {
    const { getByText } = renderWithRedux(
      <Details
        operation={{
          confirmations: 0,
          fee: { amount: '1', asset: { displayName: 'OTN' } },
          amount: { amount: '10', asset: { displayName: 'OTN' } },
          internalState: 'failed'
        }}
      />
    );

    expect(getByText('Failed')).not.toBeNull();
  });
});
