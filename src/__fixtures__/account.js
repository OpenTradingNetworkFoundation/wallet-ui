export const getUserAccount = (id = '1.2.10') => {
  return {
    id,
    options: {
      memo_key: 'key_memo'
    },
    active: {
      key_auths: [['key_active']]
    },
    owner: {
      key_auths: [['key_owner']]
    }
  };
};
