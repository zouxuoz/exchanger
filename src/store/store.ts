import { createStore as createReduxStore, Store, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer } from './reducers';
import { saga } from './sagas';

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const initialState = {};

const sagaMiddleware = createSagaMiddleware();

export const store: Store = createReduxStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(saga);
