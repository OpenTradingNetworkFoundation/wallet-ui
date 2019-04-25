import selectors from '../selectors';

describe('assets selectors', () => {
  const state = {
    assets: [
      {
        id: '1.3.5',
        name: 'BCH',
        precision: 8,
        displayName: 'OTN.BCH'
      },
      {
        id: '1.3.2',
        name: 'BTC',
        precision: 8,
        displayName: 'OTN.BTC'
      },
      {
        id: '1.3.6',
        name: 'BTG',
        precision: 8,
        displayName: 'OTN.BTG'
      },
      {
        id: '1.3.0',
        name: 'OTN',
        precision: 8,
        displayName: 'OTN'
      }
    ]
  };

  it('getAssets should return assets list', () => {
    expect(selectors.getAssets(state)).toEqual(state.assets);
  });

  it('getOtnAsset should return OTN asset', () => {
    expect(selectors.getOtnAsset(state)).toEqual({
      id: '1.3.0',
      name: 'OTN',
      precision: 8,
      displayName: 'OTN'
    });
  });

  it('getNotCoreAssets should return all but OTN asset', () => {
    expect(selectors.getNotCoreAssets(state)).toEqual([
      {
        id: '1.3.5',
        name: 'BCH',
        precision: 8,
        displayName: 'OTN.BCH'
      },
      {
        id: '1.3.2',
        name: 'BTC',
        precision: 8,
        displayName: 'OTN.BTC'
      },
      {
        id: '1.3.6',
        name: 'BTG',
        precision: 8,
        displayName: 'OTN.BTG'
      }
    ]);
  });
});
