import { createAction } from 'redux-act';

const META_REQUEST = 'app/blockchain-meta/META_REQUEST';
const META_REQUEST_SUCCESS = 'app/blockchain-meta/META_REQUEST_SUCCESS';

const loadMeta = createAction(META_REQUEST);
const loadMetaSuccess = createAction(META_REQUEST_SUCCESS);

export default {
  loadMeta,
  loadMetaSuccess
};
