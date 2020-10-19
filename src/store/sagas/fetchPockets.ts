import { call, put } from 'redux-saga/effects';

import { fetchPockets } from '../../api';
import { fetchPocketsFailed, fetchPocketsSucceeded } from '../actions';

function* fetchPocketsSaga() {
  try {
    const pockets = yield call(fetchPockets);

    yield put(fetchPocketsSucceeded(pockets));
  } catch (e) {
    yield put(fetchPocketsFailed('Fetch error'));
  }
}

export { fetchPocketsSaga };
