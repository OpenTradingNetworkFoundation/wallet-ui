export const otn = {
  id: '1.3.0',
  amount: 0,
  asset: 'OTN',
  name: 'OTN',
  precision: 8
};

export const assets = [
  otn,
  {
    id: '1.3.1',
    amount: 0,
    asset: 'ETH',
    name: 'ETH',
    precision: 8
  },
  {
    id: '1.3.2',
    amount: 10000,
    asset: 'BTC',
    name: 'BTC',
    precision: 8
  },
  {
    id: '1.3.11',
    amount: 10000,
    asset: 'XRP',
    name: 'XRP',
    precision: 6
  }
];

export const balances = [
  {
    id: '1.3.0',
    amount: 0,
    asset: 'OTN',
    name: 'OTN',
    precision: 8,
    displayAmount: '0',
    displayName: 'OTN',
    isCore: true,
    isTokenized: false,
    fullName: 'Open Trading Network'
  },
  {
    id: '1.3.1',
    amount: 0,
    asset: 'ETH',
    name: 'ETH',
    precision: 8,
    displayAmount: '0',
    displayName: 'OTN.ETH',
    isCore: false,
    isTokenized: true,
    fullName: 'Ethereum Tokenized'
  },
  {
    id: '1.3.2',
    amount: 10000,
    asset: 'BTC',
    name: 'BTC',
    precision: 8,
    displayAmount: '0.0001',
    displayName: 'OTN.BTC',
    isCore: false,
    isTokenized: true,
    fullName: 'Bitcoin Tokenized'
  },
  {
    id: '1.3.11',
    amount: 10000,
    asset: 'XRP',
    name: 'XRP',
    precision: 6,
    displayAmount: '0.01',
    displayName: 'OTN.XRP',
    isCore: false,
    isTokenized: true,
    fullName: 'Ripple Tokenized'
  }
];

export const balancesNames = ['OTN', 'OTN.ETH', 'OTN.BTC', 'OTN.XRP'];

export const tokenized = [
  {
    id: '1.3.1',
    amount: 0,
    asset: 'ETH',
    name: 'ETH',
    precision: 8,
    displayAmount: '0',
    displayName: 'OTN.ETH',
    isCore: false,
    isTokenized: true,
    fullName: 'Ethereum Tokenized'
  },
  {
    id: '1.3.2',
    amount: 10000,
    asset: 'BTC',
    name: 'BTC',
    precision: 8,
    displayAmount: '0.0001',
    displayName: 'OTN.BTC',
    isCore: false,
    isTokenized: true,
    fullName: 'Bitcoin Tokenized'
  },
  {
    id: '1.3.11',
    amount: 10000,
    asset: 'XRP',
    name: 'XRP',
    precision: 6,
    displayAmount: '0.01',
    displayName: 'OTN.XRP',
    isCore: false,
    isTokenized: true,
    fullName: 'Ripple Tokenized'
  }
];

export const native = [
  {
    id: '1.3.0',
    amount: 0,
    asset: 'OTN',
    name: 'OTN',
    precision: 8,
    displayAmount: '0',
    displayName: 'OTN',
    isCore: true,
    isTokenized: false,
    fullName: 'Open Trading Network'
  },
  {
    id: '1.3.1',
    amount: 0,
    asset: 'ETH',
    name: 'ETH',
    precision: 8,
    displayAmount: '0',
    displayName: 'ETH',
    isCore: false,
    isTokenized: false,
    fullName: 'Ethereum'
  },
  {
    id: '1.3.2',
    amount: 10000,
    asset: 'BTC',
    name: 'BTC',
    precision: 8,
    displayAmount: '0.0001',
    displayName: 'BTC',
    isCore: false,
    isTokenized: false,
    fullName: 'Bitcoin'
  },
  {
    id: '1.3.11',
    amount: 10000,
    asset: 'XRP',
    name: 'XRP',
    precision: 6,
    displayAmount: '0.01',
    displayName: 'XRP',
    isCore: false,
    isTokenized: false,
    fullName: 'Ripple'
  }
];

export const notEmpty = [
  {
    id: '1.3.2',
    amount: 10000,
    asset: 'BTC',
    name: 'BTC',
    precision: 8,
    displayAmount: '0.0001',
    displayName: 'OTN.BTC',
    isCore: false,
    isTokenized: true,
    fullName: 'Bitcoin Tokenized'
  },
  {
    id: '1.3.11',
    amount: 10000,
    asset: 'XRP',
    name: 'XRP',
    precision: 6,
    displayAmount: '0.01',
    displayName: 'OTN.XRP',
    isCore: false,
    isTokenized: true,
    fullName: 'Ripple Tokenized'
  }
];

export const pendingOperation = {
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
};
export const processedOperation = {
  id: 'f5bb8751-ae50-47e5-ab8d-1a8629a98519',
  key: 'f5bb8751-ae50-47e5-ab8d-1a8629a98519',
  amount: { amount: '10000', assetId: '1.3.0' },
  fee: { amount: '10000', assetId: '1.3.0' },
  internalType: 'detokenize',
  confirmations: 10,
  type: 'withdrawal',
  state: 'processed',
  userId: 20,
  internalState: 'done',
  internalTransactionId: 'f5bb8751-ae50-47e5-ab8d-1a8629a98519',
  timeCreated: '2018-08-23T17:25:32Z',
  lastUpdated: '2018-08-23T17:25:32Z',
  externalAddress: 'f5bb8751-ae50-47e5-ab8d-1a8629a98519'
};

export const notEmptyTokenizedWithPending = [
  {
    id: '1.3.1',
    amount: 0,
    asset: 'ETH',
    name: 'ETH',
    precision: 8,
    displayAmount: '0',
    displayName: 'OTN.ETH',
    isCore: false,
    isTokenized: true,
    fullName: 'Ethereum Tokenized'
  },
  {
    id: '1.3.2',
    amount: 10000,
    asset: 'BTC',
    name: 'BTC',
    precision: 8,
    displayAmount: '0.0001',
    displayName: 'OTN.BTC',
    isCore: false,
    isTokenized: true,
    fullName: 'Bitcoin Tokenized'
  },
  {
    id: '1.3.11',
    amount: 10000,
    asset: 'XRP',
    name: 'XRP',
    precision: 6,
    displayAmount: '0.01',
    displayName: 'OTN.XRP',
    isCore: false,
    isTokenized: true,
    fullName: 'Ripple Tokenized'
  }
];

export const notEmptyNames = ['OTN.BTC', 'OTN.XRP'];

export const core = {
  id: '1.3.0',
  amount: 0,
  asset: 'OTN',
  name: 'OTN',
  precision: 8,
  displayAmount: '0',
  displayName: 'OTN',
  isCore: true,
  isTokenized: false,
  fullName: 'Open Trading Network'
};

const btcMapping = balances.filter(balance =>
  ['1.3.0', '1.3.1'].includes(balance.id)
);
const ethMapping = balances.filter(balance =>
  ['1.3.0', '1.3.2'].includes(balance.id)
);

export const exchangeScheme = {
  '1.3.0': balances,
  '1.3.1': ethMapping,
  '1.3.2': btcMapping,
  '1.3.11': balances.filter(balance => balance.name === 'OTN')
};

export const balancesMap = balances.reduce(
  (pr, cr) => ({ ...pr, [cr.id]: cr }),
  {}
);
