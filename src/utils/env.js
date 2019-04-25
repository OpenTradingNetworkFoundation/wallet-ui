import ENV from 'enums/env';
import config from 'utils/networkConfig';

export const isProd = () => config.get('app.env') === ENV.PROD;

export const getVersion = () => process.env.__VERSION__;

export const isElectron = () =>
  navigator.userAgent.toLowerCase().includes('electron');

export default { isProd, getVersion, isElectron };
