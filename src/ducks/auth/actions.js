import { createAction } from 'redux-act';

const UPDATE = 'app/auth/UPDATE';

const update = createAction(UPDATE);

export default {
  update
};
