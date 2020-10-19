import { takeLatest } from 'redux-saga/effects';

import { FETCH_POCKETS_REQUESTED, FETCH_RATES_REQUESTED, EXCHANGE } from '../constants';
import { exchangeSaga } from './exchange';
import { fetchPocketsSaga } from './fetchPockets';
import { fetchRatesSaga } from './fetchRates';

function* saga() {
  yield takeLatest(FETCH_POCKETS_REQUESTED, fetchPocketsSaga);
  yield takeLatest(FETCH_RATES_REQUESTED, fetchRatesSaga);
  yield takeLatest(EXCHANGE, exchangeSaga);
}

export { saga };
