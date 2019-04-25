import { createSelector } from 'reselect';

import EXCHANGE_MODE from 'enums/exchangeMode';

const interfaceMode = state => state.interfaceMode;
const mode = createSelector(
  interfaceMode,
  interfaceState => interfaceState.mode
);

const isPro = createSelector(mode, mode => mode === EXCHANGE_MODE.PRO);

export default { interfaceMode, mode, isPro };
