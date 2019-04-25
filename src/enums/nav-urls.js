import URL from 'enums/url';

import WalletIcon from 'icons/wallet.svg';
import ExchangeIcon from 'icons/exchange.svg';
import HistoryIcon from 'icons/history.svg';
import VestingIcon from 'icons/vesting.svg';

const NAV_URLS = [
  {
    url: URL.WALLET,
    icon: WalletIcon,
    name: 'wallet'
  },
  {
    url: URL.EXCHANGE,
    icon: ExchangeIcon,
    name: 'exchange'
  },
  {
    url: URL.HISTORY,
    icon: HistoryIcon,
    name: 'history'
  },
  {
    url: URL.VESTING_BALANCES,
    icon: VestingIcon,
    name: 'vesting'
  }
];

export default NAV_URLS;
