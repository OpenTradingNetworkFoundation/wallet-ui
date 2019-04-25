import OtnIcon from 'icons/coins/otn-coin.svg';
import OtnBtcIcon from 'icons/coins/btc-coin.svg';
import OtnEthIcon from 'icons/coins/eth-coin.svg';
import OtnBchIcon from 'icons/coins/bch-coin.svg';
import OtnBtgIcon from 'icons/coins/btg-coin.svg';
import OtnEosIcon from 'icons/coins/eos-coin.svg';
import OtnEtcIcon from 'icons/coins/etc-coin.svg';
import OtnLtcIcon from 'icons/coins/ltc-coin.svg';
import OtnOmgIcon from 'icons/coins/omg-coin.svg';
import OtnTrxIcon from 'icons/coins/trx-coin.svg';
import OtnXrpIcon from 'icons/coins/xrp-coin.svg';
import OtnZecIcon from 'icons/coins/zec-coin.svg';

const ASSET = {
  OTN: 'OTN',
  BTC: 'BTC',
  ETH: 'ETH',
  BCH: 'BCH',
  BTG: 'BTG',
  EOS: 'EOS',
  ETC: 'ETC',
  LTC: 'LTC',
  OMG: 'OMG',
  TRX: 'TRX',
  XRP: 'XRP',
  ZEC: 'ZEC'
};

const ASSET_ICON = {
  [ASSET.OTN]: OtnIcon,
  [ASSET.BTC]: OtnBtcIcon,
  [ASSET.ETH]: OtnEthIcon,
  [ASSET.BCH]: OtnBchIcon,
  [ASSET.BTG]: OtnBtgIcon,
  [ASSET.EOS]: OtnEosIcon,
  [ASSET.ETC]: OtnEtcIcon,
  [ASSET.LTC]: OtnLtcIcon,
  [ASSET.OMG]: OtnOmgIcon,
  [ASSET.TRX]: OtnTrxIcon,
  [ASSET.XRP]: OtnXrpIcon,
  [ASSET.ZEC]: OtnZecIcon
};

const PRIORITY = {
  [ASSET.OTN]: 3,
  [ASSET.BTC]: 2,
  [ASSET.ETH]: 1
};

export const getPrioritizedAssets = () =>
  Object.values(ASSET)
    .map(name => ({ name, priority: PRIORITY[name] || 0 }))
    .sort((a, b) => a.priority - b.priority)
    .map((asset, index) => ({ ...asset, priority: index }))
    .reduce((res, asset) => ({ ...res, [asset.name]: asset.priority }), {});

export const ASSET_PRIORITY = getPrioritizedAssets();

export { ASSET, ASSET_ICON };
