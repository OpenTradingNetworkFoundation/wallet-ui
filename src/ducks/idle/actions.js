import { createAction } from 'redux-act';

const UPDATE_ACTIVITY = 'app/idle/UPDATE_ACTIVITY';
const INACTIVE = 'app/idle/INACTIVE';

const updateActivity = createAction(UPDATE_ACTIVITY);
const inactive = createAction(INACTIVE);

export default {
  updateActivity,
  inactive
};
