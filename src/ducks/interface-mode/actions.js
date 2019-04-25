import { createAction } from 'redux-act';

const UPDATE_MODE = 'app/interface-mode/UPDATE_MODE';

const updateInterfaceMode = createAction(UPDATE_MODE);

export default {
  updateInterfaceMode
};
