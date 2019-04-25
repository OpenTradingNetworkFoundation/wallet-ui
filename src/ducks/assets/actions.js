import { createAction } from 'redux-act';

const ASSETS_REQUEST = 'app/assets/ASSETS_REQUEST';
const ASSETS_SUCCESS = 'app/assets/ASSETS_SUCCESS';

const loadAssets = createAction(ASSETS_REQUEST);
const loadAssetsSuccess = createAction(ASSETS_SUCCESS);

export default {
  loadAssets,
  loadAssetsSuccess
};
