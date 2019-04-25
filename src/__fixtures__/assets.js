const ASSETS = [
  {
    id: '1.3.0',
    amount: 100000000,
    displayAmount: '1',
    asset: 'OTN',
    name: 'OTN',
    precision: 8,
    displayName: 'OTN',
    fullName: 'Open Trading Network',
    isCore: true
  },
  {
    id: '1.3.2',
    amount: 10000000,
    displayAmount: '0.1',
    asset: 'BTC',
    name: 'BTC',
    precision: 8,
    displayName: 'OTN.BTC',
    fullName: 'Bitcoin',
    isCore: false
  },
  {
    id: '1.3.3',
    amount: 10000000,
    displayAmount: '0.1',
    asset: 'ETH',
    name: 'ETH',
    precision: 8,
    displayName: 'OTN.ETH',
    fullName: 'Ethereum',
    isCore: false
  },
  {
    id: '1.3.6',
    amount: 0,
    displayAmount: '0',
    asset: 'BTG',
    name: 'BTG',
    precision: 8,
    displayName: 'OTN.BTG',
    fullName: 'Bitcoin Gold',
    isCore: false
  }
];

export const getAssets = () => [...ASSETS];
export const getAssetsByName = name =>
  getAssets().find(asset => asset.name === name);

export const getTokenizedAssets = () =>
  getAssets().map(asset => ({
    ...asset,
    isTokenized: asset.name !== 'OTN',
    fullName:
      asset.name !== 'OTN' ? `${asset.fullName} Tokenized` : asset.fullName
  }));
export const getTokenizedAssetByName = name =>
  getTokenizedAssets().find(asset => asset.name === name);
