import { createSelector } from 'reselect';

const account = state => state.account;

const accountId = createSelector(account, account => account.id);
const accountPlainId = createSelector(accountId, id => id.split('.')[2]);
const accountName = createSelector(account, account => account.name);

const publicKeys = createSelector(account, account => {
  return account
    ? {
        memo: account.options.memo_key,
        active: account.active.key_auths[0][0],
        owner: account.owner.key_auths[0][0]
      }
    : {};
});

export default {
  account,
  accountId,
  accountPlainId,
  publicKeys,
  accountName
};
