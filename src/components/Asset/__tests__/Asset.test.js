import React from 'react';
import { fireEvent, cleanup } from 'react-testing-library';

import { renderWithRedux } from 'src/__utils__';

import Asset from '../index';

const getState = (isEmpty = true) => ({
  externalHistory: {
    operations: isEmpty
      ? []
      : [
          {
            id: 'f5bb8751-ae50-47e5-ab8d-1a8629a98518',
            key: 'f5bb8751-ae50-47e5-ab8d-1a8629a98518',
            amount: { amount: '10000', assetId: '1.3.1' },
            fee: { amount: '10000', assetId: '1.3.1' },
            internalType: 'detokenize',
            confirmations: 0,
            type: 'withdrawal',
            state: 'pending',
            userId: 20,
            internalState: 'pending',
            internalTransactionId: 'f5bb8751-ae50-47e5-ab8d-1a8629a98518',
            timeCreated: '2018-08-23T17:25:32Z',
            lastUpdated: '2018-08-23T17:25:32Z',
            externalAddress: 'f5bb8751-ae50-47e5-ab8d-1a8629a98518'
          }
        ]
  },
  assets: [{ id: '1.3.1', precision: 8 }, { id: '1.3.0', precision: 8 }],
  gateway: {
    availableAssets: [
      { id: '1.3.1', precision: 8 },
      { id: '1.3.0', precision: 8 }
    ]
  }
});

const eth = {
  id: '1.3.1',
  asset: 'ETH',
  displayName: 'OTN.ETH',
  name: 'ETH',
  isTokenized: true,
  precision: 8,
  displayAmount: '0.0001',
  amount: 10000,
  fullName: 'Ethereum Tokenized'
};

const otn = {
  id: '1.3.0',
  asset: 'OTN',
  displayName: 'OTN',
  name: 'OTN',
  isTokenized: true,
  precision: 8,
  displayAmount: '0',
  amount: 0,
  fullName: 'Open Trading Network'
};

describe('<Asset />', () => {
  afterEach(cleanup);

  describe('render', () => {
    test('Without active operations', () => {
      const { container, queryByText, queryAllByText } = renderWithRedux(
        <Asset asset={eth} />,
        getState()
      );

      expect(container).not.toBeNull();

      expect(queryByText('eth-coin.svg')).not.toBeNull();
      expect(queryByText('otn-icon.svg')).not.toBeNull();
      expect(queryAllByText(/detokenize.svg/i)).toHaveLength(1);

      expect(queryByText('0.0001')).not.toBeNull();
      expect(queryByText('OTN.ETH')).not.toBeNull();
      expect(queryByText('Ethereum Tokenized')).not.toBeNull();

      expect(queryByText('Send')).not.toBeNull();
      expect(queryByText('Receive')).not.toBeNull();
      expect(queryByText('exchange-icon-blue.svg')).not.toBeNull();
    });

    test('With active operations', () => {
      const { container, queryByText, queryAllByText } = renderWithRedux(
        <Asset asset={eth} />,
        getState(false)
      );

      expect(container).not.toBeNull();

      expect(queryAllByText(/detokenize.svg/i)).toHaveLength(2);
      expect(queryByText(/pending-big.svg/i)).not.toBeNull();

      expect(queryByText('0.0001')).not.toBeNull();
      expect(queryByText('OTN.ETH')).not.toBeNull();
      expect(queryByText('Ethereum Tokenized')).not.toBeNull();

      expect(queryByText('Send')).not.toBeNull();
      expect(queryByText('Receive')).not.toBeNull();
      expect(queryByText('exchange-icon-blue.svg')).not.toBeNull();
    });

    test('external className', () => {
      const { container, queryByTestId } = renderWithRedux(
        <Asset asset={eth} className="test-class" />,
        getState()
      );

      expect(container).not.toBeNull();

      const div = queryByTestId('asset-container-ETH');

      expect(div).not.toBeNull();
      expect(div.className).toContain('test-class');
    });

    test('exchange tooltip', () => {
      const { container, queryByText } = renderWithRedux(
        <Asset asset={eth} />,
        getState(false)
      );

      expect(container).not.toBeNull();

      const exchangeIcon = queryByText('exchange-icon-blue.svg');
      expect(exchangeIcon).not.toBeNull();

      fireEvent.mouseEnter(exchangeIcon);
      expect(queryByText('Exchange')).not.toBeNull();
    });

    test('Detokenize tooltip', () => {
      const { container, queryByText } = renderWithRedux(
        <Asset asset={eth} />,
        getState(false)
      );

      expect(container).not.toBeNull();

      const detokenizeIcon = queryByText('detokenize.svg');
      expect(detokenizeIcon).not.toBeNull();

      fireEvent.mouseEnter(detokenizeIcon);
      expect(queryByText('Detokenize')).not.toBeNull();
    });

    test('detokenization disabled tooltip', () => {
      const { container, queryByText } = renderWithRedux(
        <Asset asset={eth} />,
        { gateway: { availableAssets: [] } }
      );

      expect(container).not.toBeNull();

      const detokenizeIcon = queryByText('detokenize.svg');
      expect(detokenizeIcon).not.toBeNull();

      fireEvent.mouseEnter(detokenizeIcon);
      expect(
        queryByText(/Detokenization for this asset is not supported/i)
      ).not.toBeNull();
    });
  });

  describe('logic', () => {
    describe('enabled', () => {
      test('open send', () => {
        const { container, queryByText, history } = renderWithRedux(
          <Asset asset={eth} />,
          getState()
        );

        expect(container).not.toBeNull();

        const button = queryByText('Send');
        fireEvent.click(button);

        expect(history.location.pathname).toBe('/wallet/send');
        expect(history.location.search).toBe('?asset=OTN.ETH');
      });

      test('open receive', () => {
        const { container, queryByText, history } = renderWithRedux(
          <Asset asset={eth} />,
          getState()
        );

        expect(container).not.toBeNull();

        const button = queryByText('Receive');
        fireEvent.click(button);

        expect(history.location.pathname).toBe('/wallet/receive');
        expect(history.location.search).toBe('?asset=OTN.ETH');
      });

      test('open detokenize', () => {
        const { container, queryByText, history } = renderWithRedux(
          <Asset asset={eth} />,
          getState()
        );

        expect(container).not.toBeNull();

        const button = queryByText(/detokenize.svg/i);
        fireEvent.click(button);

        expect(history.location.pathname).toBe('/wallet/detokenize');
        expect(history.location.search).toBe('?asset=OTN.ETH');
      });

      test('open exchange', () => {
        const { container, queryByText, history } = renderWithRedux(
          <Asset asset={eth} />,
          getState()
        );

        expect(container).not.toBeNull();

        const button = queryByText(/exchange-icon-blue.svg/i);
        fireEvent.click(button);

        expect(history.location.pathname).toBe('/exchange');
        expect(history.location.search).toBe('?asset=OTN.ETH');
      });
    });

    describe('disabled', () => {
      test('open send', () => {
        const { container, queryByText, history } = renderWithRedux(
          <Asset asset={otn} />,
          getState()
        );
        history.push('/wallet/');

        expect(container).not.toBeNull();

        const button = queryByText('Send');
        fireEvent.click(button);

        expect(history.location.pathname).toBe('/wallet/');
        expect(history.location.search).toBe('');
      });

      test('open receive', () => {
        const { container, queryByText, history } = renderWithRedux(
          <Asset asset={otn} />,
          getState()
        );
        history.push('/wallet/');

        expect(container).not.toBeNull();

        const button = queryByText('Receive');
        fireEvent.click(button);

        expect(history.location.pathname).toBe('/wallet/receive');
        expect(history.location.search).toBe('?asset=OTN');
      });

      test('open detokenize', () => {
        const { container, queryByText, history } = renderWithRedux(
          <Asset asset={otn} />,
          getState()
        );
        history.push('/wallet/');

        expect(container).not.toBeNull();

        const button = queryByText(/detokenize.svg/i);
        fireEvent.click(button);

        expect(history.location.pathname).toBe('/wallet/');
        expect(history.location.search).toBe('');
      });

      test('open exchange', () => {
        const { container, queryByText, history } = renderWithRedux(
          <Asset asset={otn} />,
          getState()
        );
        history.push('/wallet/');

        expect(container).not.toBeNull();

        const button = queryByText(/exchange-icon-blue.svg/i);
        fireEvent.click(button);

        expect(history.location.pathname).toBe('/wallet/');
        expect(history.location.search).toBe('');
      });
    });

    describe('disabled detokenization', () => {
      test('open detokenize', () => {
        const { container, queryByText, history } = renderWithRedux(
          <Asset asset={otn} />,
          { gateway: { availableAssets: [] } }
        );
        history.push('/wallet/');

        expect(container).not.toBeNull();

        const button = queryByText(/exchange-icon-blue.svg/i);
        fireEvent.click(button);

        expect(history.location.pathname).toBe('/wallet/');
        expect(history.location.search).toBe('');
      });
    });
  });
});
