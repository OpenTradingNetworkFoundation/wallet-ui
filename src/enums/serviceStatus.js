export const SERVICE = {
  GATEWAY: 'gateway',
  NODE: 'node',
  FAUCET: 'faucet',
  APPLICATION_STARTUP: 'applicationStartup'
};

export const ERROR = {
  500: '500',
  404: '404',
  [SERVICE.NODE]: SERVICE.NODE,
  [SERVICE.GATEWAY]: SERVICE.GATEWAY,
  [SERVICE.APPLICATION_STARTUP]: SERVICE.APPLICATION_STARTUP,
  GENERIC: 'generic'
};
