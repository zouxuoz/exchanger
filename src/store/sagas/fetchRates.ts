import { call, put, select } from 'redux-saga/effects';

import { fetchRates } from '../../api';
import { fetchRatesFailed, fetchRatesSucceeded } from '../actions';
import { getActiveExchangeCurrency } from '../selectors';
import { FetchRatesAction } from '../types';

function* fetchRatesSaga(action: FetchRatesAction) {
  try {
    let base = action.payload;

    if (!base) {
      base = yield select(getActiveExchangeCurrency);
    }

    if (!base) {
      yield put(fetchRatesFailed(`Currency base don't provided`));

      return;
    }

    const rates = yield call(fetchRates, base);

    yield put(fetchRatesSucceeded(rates));
  } catch (e) {
    console.log(e);
    yield put(fetchRatesFailed('Fetch error'));
  }
}

export { fetchRatesSaga };
