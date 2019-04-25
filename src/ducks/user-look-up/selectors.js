import { createSelector } from 'reselect';

import { hasNotNullMemoKey } from 'services/memo';

const plain = state => state.userLookUp;

const userLookUp = createSelector(plain, state => {
  return {
    isLoading: state.isLoading,
    exist: Boolean(state.account),
    hasNotNullMemoKey: hasNotNullMemoKey(state.account)
  };
});

export default { userLookUp };
