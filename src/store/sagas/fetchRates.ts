import { call, put, select } from 'redux-saga/effects';

import { fetchRates } from '../../api';
import { fetchRatesFailed, fetchRatesSucceeded } from '../actions';
import { getExchangeCurrency } from '../selectors';
import { FetchRatesAction, Rates } from '../types';

function* fetchRatesSaga(action: FetchRatesAction) {
  try {
    let base = action.payload;

    if (!base) {
      base = yield select(getExchangeCurrency);
    }

    if (!base) {
      yield put(fetchRatesFailed(`Currency base don't provided`));

      return;
    }

    const rates: Rates = yield call(fetchRates, base);

    yield put(fetchRatesSucceeded(rates));
  } catch (e) {
    yield put(fetchRatesFailed('Fetch error'));
  }
}

export { fetchRatesSaga };
