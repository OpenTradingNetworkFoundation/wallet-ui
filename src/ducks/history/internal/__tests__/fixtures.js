export const history = [
  {
    id: '1.11.1',
    op: [
      0,
      {
        fee: { amount: 10000, asset_id: '1.3.0' },
        from: '1.2.1',
        to: '1.2.6',
        amount: { amount: 1000000, asset_id: '1.3.0' },
        extensions: []
      }
    ],
    result: [0, {}],
    block_num: 163146,
    trx_in_block: 132,
    op_in_trx: 0,
    virtual_op: 39647
  },
  {
    id: '1.11.2',
    op: [
      0,
      {
        fee: { amount: 10000, asset_id: '1.3.0' },
        from: '1.2.20',
        to: '1.2.17',
        amount: { amount: 1000000, asset_id: '1.3.0' },
        extensions: []
      }
    ],
    result: [0, {}],
    block_num: 152407,
    trx_in_block: 121,
    op_in_trx: 0,
    virtual_op: 10534
  },
  {
    id: '1.11.3',
    op: [
      4,
      {
        fee: { amount: 0, asset_id: '1.3.0' },
        order_id: '1.7.113602',
        account_id: '1.2.20',
        pays: { amount: 1000000, asset_id: '1.3.3' },
        receives: { amount: 419537703, asset_id: '1.3.0' },
        fill_price: {
          base: { amount: '2000000000000', asset_id: '1.3.0' },
          quote: { amount: '4767151999', asset_id: '1.3.3' }
        },
        is_maker: false
      }
    ],
    result: [0, {}],
    block_num: 134096,
    trx_in_block: 132,
    op_in_trx: 0,
    virtual_op: 26142
  },
  {
    id: '1.11.4',
    op: [
      5,
      {
        fee: { amount: 11445, asset_id: '1.3.0' },
        registrar: '1.2.17',
        referrer: '1.2.17',
        referrer_percent: 50,
        name: 'dino-zavr',
        owner: {
          weight_threshold: 1,
          account_auths: [],
          key_auths: [['key_auths', 1]],
          address_auths: []
        },
        active: {
          weight_threshold: 1,
          account_auths: [],
          key_auths: [['key_auths', 1]],
          address_auths: []
        },
        options: {
          memo_key: 'memo_key',
          voting_account: '1.2.17',
          num_witness: 0,
          num_committee: 0,
          votes: [],
          extensions: []
        },
        extensions: {}
      }
    ],
    result: [1, '1.2.20'],
    block_num: 144,
    trx_in_block: 0,
    op_in_trx: 0,
    virtual_op: 19289
  }
];

export const formattedHistory = [
  {
    internalType: 'send',
    id: '1.11.1',
    key: '1.11.1',
    amount: { amount: 1000000, assetId: '1.3.0' },
    fee: { amount: 10000, assetId: '1.3.0' },
    transactionId: '1.11.1',
    blockNumber: 163146,
    from: '1.2.1',
    to: '1.2.6',
    state: 'processed',
    internalState: 'processed'
  },
  {
    internalType: 'receive',
    id: '1.11.2',
    key: '1.11.2',
    amount: { amount: 1000000, assetId: '1.3.0' },
    fee: { amount: 10000, assetId: '1.3.0' },
    transactionId: '1.11.2',
    blockNumber: 152407,
    from: '1.2.20',
    to: '1.2.17',
    state: 'processed',
    internalState: 'processed'
  },
  {
    internalType: 'exchange',
    id: '1.11.3',
    key: '1.11.3',
    fee: { amount: 0, assetId: '1.3.0' },
    transactionId: '1.11.3',
    blockNumber: 134096,
    orderId: '1.7.113602',
    accountId: '1.2.20',
    pays: { amount: 1000000, asset_id: '1.3.3' },
    receives: { amount: 419537703, asset_id: '1.3.0' },
    state: 'processed',
    internalState: 'processed'
  }
];

export const assets = [
  {
    id: '1.3.2',
    name: 'BTC',
    precision: 8,
    displayName: 'OTN.BTC'
  },
  {
    id: '1.3.3',
    name: 'ETH',
    precision: 8,
    displayName: 'OTN.ETH'
  },
  {
    id: '1.3.0',
    name: 'OTN',
    precision: 8,
    displayName: 'OTN'
  }
];

export const profile = {
  '1.2.20': {
    id: '1.2.20',
    name: 'from-name'
  },
  '1.2.6': {
    id: '1.2.6',
    name: 'to-name'
  }
};

export const entries = [
  {
    internalType: 'send',
    id: '1.11.1',
    key: '1.11.1',
    amount: {
      amount: '0.01',
      asset: { id: '1.3.0', name: 'OTN', precision: 8, displayName: 'OTN' }
    },
    fee: {
      amount: '0.0001',
      asset: { id: '1.3.0', name: 'OTN', precision: 8, displayName: 'OTN' }
    },
    transactionId: '1.11.1',
    blockNumber: 163146,
    from: { id: '1.2.1', name: '-' },
    to: { id: '1.2.6', name: 'to-name' },
    state: 'processed',
    internalState: 'processed',
    pays: null,
    receives: null,
    isIrreversible: false
  },
  {
    internalType: 'receive',
    id: '1.11.2',
    key: '1.11.2',
    amount: {
      amount: '0.01',
      asset: { id: '1.3.0', name: 'OTN', precision: 8, displayName: 'OTN' }
    },
    fee: {
      amount: '0.0001',
      asset: { id: '1.3.0', name: 'OTN', precision: 8, displayName: 'OTN' }
    },
    transactionId: '1.11.2',
    blockNumber: 152407,
    from: { id: '1.2.20', name: 'from-name' },
    to: { id: '1.2.17', name: '-' },
    state: 'processed',
    internalState: 'processed',
    pays: null,
    receives: null,
    isIrreversible: false
  },
  {
    internalType: 'exchange-out',
    id: '1.11.3',
    key: '1.11.3.1.3.3',
    fee: {
      amount: '0',
      asset: { id: '1.3.0', name: 'OTN', precision: 8, displayName: 'OTN' }
    },
    transactionId: '1.11.3',
    blockNumber: 134096,
    orderId: '1.7.113602',
    accountId: '1.2.20',
    pays: {
      amount: '0.01',
      asset: { id: '1.3.3', name: 'ETH', precision: 8, displayName: 'OTN.ETH' }
    },
    receives: {
      amount: '4.19537703',
      asset: { id: '1.3.0', name: 'OTN', precision: 8, displayName: 'OTN' }
    },
    state: 'processed',
    internalState: 'processed',
    amount: {
      amount: '0.01',
      asset: { id: '1.3.3', name: 'ETH', precision: 8, displayName: 'OTN.ETH' }
    },
    from: null,
    to: null,
    isIrreversible: false
  },
  {
    internalType: 'exchange-in',
    id: '1.11.3',
    key: '1.11.3.1.3.0',
    fee: {
      amount: '0',
      asset: { id: '1.3.0', name: 'OTN', precision: 8, displayName: 'OTN' }
    },
    transactionId: '1.11.3',
    blockNumber: 134096,
    orderId: '1.7.113602',
    accountId: '1.2.20',
    pays: {
      amount: '0.01',
      asset: { id: '1.3.3', name: 'ETH', precision: 8, displayName: 'OTN.ETH' }
    },
    receives: {
      amount: '4.19537703',
      asset: { id: '1.3.0', name: 'OTN', precision: 8, displayName: 'OTN' }
    },
    state: 'processed',
    internalState: 'processed',
    amount: {
      amount: '4.19537703',
      asset: { id: '1.3.0', name: 'OTN', precision: 8, displayName: 'OTN' }
    },
    from: null,
    to: null,
    isIrreversible: false
  }
];
