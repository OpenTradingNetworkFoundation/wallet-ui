import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer, { rootSagas } from 'ducks/root';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  // eslint-disable-next-line
  onError: error => console.log(error)
});

export function configureStore(initialState = {}, routerHistory = history) {
  const reduxRouterMiddleware = routerMiddleware(routerHistory);
  const createStoreResult = createStore(
    connectRouter(routerHistory)(rootReducer),
    initialState,
    composeWithDevTools(applyMiddleware(reduxRouterMiddleware, sagaMiddleware))
  );

  sagaMiddleware.run(rootSagas.rootSaga);

  return createStoreResult;
}

const store = configureStore();

export default store;
