import { createAction } from 'redux-act';

const NAVIGATE = 'app/router/NAVIGATE';
const BACK = 'app/router/BACK';

const navigate = createAction(NAVIGATE);
const back = createAction(BACK);

export default {
  navigate,
  back
};
