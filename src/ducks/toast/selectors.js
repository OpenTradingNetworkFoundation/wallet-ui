import { createSelector } from 'reselect';

const getToast = state => state.toast;

const getItems = createSelector(getToast, ({ ids, items }) => {
  return ids.map(id => items[id]);
});

export default { getToast, getItems };
