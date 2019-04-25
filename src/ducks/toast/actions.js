import { createAction } from 'redux-act';

const ITEM_CREATE = 'app/toast/ITEM_CREATE';
const ITEM_SHOW = 'app/toast/ITEM_SHOW';
const ITEM_HIDE = 'app/toast/ITEM_HIDE';
const ITEM_COLLAPSE = 'app/toast/ITEM_COLLAPSE';
const ITEM_REMOVE = 'app/toast/ITEM_REMOVE';
const ITEM_CLOSE = 'app/toast/ITEM_CLOSE';
const FOCUS = 'app/toast/FOCUS';
const BLUR = 'app/toast/BLUR';
// on user activity (sagas)
// const USER_ACTIVITY = 'app/toast/USER_ACTIVITY';

let _id = 0;

const itemCreate = createAction(ITEM_CREATE, data => ({ id: ++_id, ...data }));
const itemShow = createAction(ITEM_SHOW);
const itemHide = createAction(ITEM_HIDE);
const itemCollapse = createAction(ITEM_COLLAPSE);
const itemRemove = createAction(ITEM_REMOVE);
const itemClose = createAction(ITEM_CLOSE);
const focus = createAction(FOCUS);
const blur = createAction(BLUR);

export default {
  itemCreate,
  itemShow,
  itemHide,
  itemCollapse,
  itemRemove,
  itemClose,
  focus,
  blur
};
