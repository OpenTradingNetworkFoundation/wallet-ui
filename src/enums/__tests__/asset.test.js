import { getPrioritizedAssets } from '../asset';

describe('Asset enum', () => {
  test('getPrioritizedAssets', () => {
    expect(getPrioritizedAssets()).toEqual({
      ETC: 0,
      ZEC: 1,
      XRP: 2,
      BCH: 3,
      BTG: 4,
      EOS: 5,
      TRX: 6,
      LTC: 7,
      OMG: 8,
      ETH: 9,
      BTC: 10,
      OTN: 11
    });
  });
});
