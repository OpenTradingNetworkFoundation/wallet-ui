import selectors from '../selectors';

const balance = {
  assets: [
    {
      id: '1.3.2',
      name: 'BTC',
      precision: 8
    },
    {
      id: '1.3.0',
      name: 'OTN',
      precision: 8
    }
  ]
};

const limitOrders = [
  {
    id: '1.7.1272',
    expiration: '2019-09-30T21:00:00',
    seller: '1.2.20',
    for_sale: 100000000,
    sell_price: {
      base: {
        amount: 100000000,
        asset_id: '1.3.0'
      },
      quote: {
        amount: 12700,
        asset_id: '1.3.2'
      }
    },
    deferred_fee: 10000
  },
  {
    id: '1.7.4796',
    expiration: '2019-09-30T21:00:00',
    seller: '1.2.20',
    for_sale: 11300,
    sell_price: {
      base: {
        amount: 11300,
        asset_id: '1.3.2'
      },
      quote: {
        amount: 100000000,
        asset_id: '1.3.0'
      }
    },
    deferred_fee: 10000
  }
];

describe('Order book selectors', () => {
  describe('when state is not empty', () => {
    const state = {
      orderBook: {
        limitOrders,
        baseId: '1.3.0',
        quoteId: '1.3.2'
      },
      balance
    };

    test('orderBook', () => {
      expect(selectors.orderBook(state)).toBe(state.orderBook);
    });

    describe('limitOrders', () => {
      test('without rounding', () => {
        expect(selectors.limitOrders(state)).toEqual({
          asks: [
            {
              base: '1',
              baseAmount: '1',
              baseTotal: '1',
              price: '0.000127',
              quote: '1',
              quoteAmount: '0.000127',
              quoteTotal: '0.000127'
            }
          ],
          bids: [
            {
              base: '1',
              baseAmount: '1',
              baseTotal: '1',
              price: '0.000113',
              quote: '1',
              quoteAmount: '0.000113',
              quoteTotal: '0.000113'
            }
          ]
        });
      });
    });

    describe('averagePrice', () => {
      test('both', () => {
        expect(selectors.averagePrice(state)).toEqual('0.00012');
      });
    });
  });

  describe('when state is empty', () => {
    const state = {
      orderBook: {
        limitOrders: []
      },
      balance
    };

    test('orderBook', () => {
      expect(selectors.orderBook(state)).toBe(state.orderBook);
    });

    describe('limitOrders', () => {
      expect(selectors.limitOrders(state)).toEqual({
        asks: [],
        bids: []
      });
    });

    describe('averagePrice', () => {
      expect(selectors.averagePrice(state)).toBe('0');
    });
  });
});
