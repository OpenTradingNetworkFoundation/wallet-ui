export const plainOrders = [
  {
    id: 1,
    expiration: '2019-10-18T10:09:08',
    for_sale: 10000,
    sell_price: {
      base: {
        amount: 10000,
        asset_id: '1.3.0'
      },
      quote: {
        amount: 20000,
        asset_id: '1.3.2'
      }
    }
  },
  {
    id: 2,
    expiration: '2019-10-18T10:09:09',
    for_sale: 5000,
    sell_price: {
      base: {
        amount: 5000,
        asset_id: '1.3.2'
      },
      quote: {
        amount: 10000,
        asset_id: '1.3.0'
      }
    }
  },
  {
    id: 3,
    expiration: '2019-10-18T10:09:10',
    for_sale: 7500,
    sell_price: {
      base: {
        amount: 10000,
        asset_id: '1.3.0'
      },
      quote: {
        amount: 20000,
        asset_id: '1.3.2'
      }
    }
  }
];

const otn = {
  name: 'OTN',
  id: '1.3.0',
  precision: 8,
  displayName: 'OTN',
  isTokenized: false
};

const btc = {
  name: 'BTC',
  id: '1.3.2',
  precision: 8,
  displayName: 'OTN.BTC',
  isTokenized: true
};

export const balancesMap = {
  '1.3.0': otn,
  '1.3.2': btc
};

export const formattedOrders = [
  {
    id: 1,
    expiration: '2019-10-18T10:09:08',
    price: '2',
    type: 'SELL',
    percentage: 0,
    base: {
      ...otn,
      amount: 10000,
      displayAmount: '0.0001'
    },
    quote: {
      ...btc,
      amount: 20000,
      displayAmount: '0.0002'
    }
  },

  {
    id: 2,
    expiration: '2019-10-18T10:09:09',
    price: '0.5',
    type: 'BUY',
    percentage: 0,
    base: {
      ...otn,
      amount: 10000,
      displayAmount: '0.0001'
    },
    quote: {
      ...btc,
      amount: 5000,
      displayAmount: '0.00005'
    }
  },

  {
    id: 3,
    expiration: '2019-10-18T10:09:10',
    price: '2',
    type: 'SELL',
    percentage: 25,
    base: {
      ...otn,
      amount: 10000,
      displayAmount: '0.0001'
    },
    quote: {
      ...btc,
      amount: 20000,
      displayAmount: '0.0002'
    }
  }
].sort((a, b) => new Date(b.expiration) - new Date(a.expiration));

export const balance = {
  isFetching: false,
  assets: [
    {
      id: '1.3.0',
      name: 'OTN',
      precision: 8,
      displayName: 'OTN'
    },
    {
      id: '1.3.2',
      name: 'BTC',
      precision: 8,
      displayName: 'OTN.BTC'
    }
  ]
};
