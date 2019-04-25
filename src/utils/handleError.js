import { put } from 'redux-saga/effects';
import { errorHandlerActions } from 'ducks/errorHandler';

export default function handleError(generator, handler) {
  return function*(...args) {
    try {
      yield* generator(...args);
    } catch (error) {
      const handlerAction = handler || errorHandlerActions.handleError;
      yield put(handlerAction(error));
    }
  };
}
