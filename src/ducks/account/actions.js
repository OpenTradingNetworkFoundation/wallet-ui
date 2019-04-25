import { createAction } from 'redux-act';

const UPDATE = 'app/account/UPDATE';

const update = createAction(UPDATE);

export default {
  update
};
