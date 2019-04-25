import { createAction } from 'redux-act';

const LOOK_UP = 'app/user-look-up/LOOK_UP';
const LOOK_UP_SUCCESS = 'app/user-look-up/LOOK_UP_SUCCESS';
const UPDATE = 'app/user-look-up/UPDATE';

const lookUp = createAction(LOOK_UP);
const lookUpSuccess = createAction(LOOK_UP_SUCCESS);
const update = createAction(UPDATE);

export default {
  lookUp,
  lookUpSuccess,
  update
};
