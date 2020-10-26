import { call, put, select } from 'redux-saga/effects';

import { fetchRates as fetchRatesRequest } from '../../../api';
import { fetchRates, fetchRatesFailed, fetchRatesSucceeded } from '../../actions';
import { Currency } from '../../constants';
import { getExchangeCurrency } from '../../selectors';
import { fetchRatesSaga } from '../fetchRates';

const RATES = {
  [Currency.GBP]: 0.7648026316,
  [Currency.USD]: 1,
  [Currency.EUR]: 0.8434547908,
  [Currency.JPY]: 104.7317813765,
};

it('Should fetch rates and send fetch success action.', () => {
  const generator = fetchRatesSaga(fetchRates(Currency.USD));

  expect(generator.next().value).toEqual(call(fetchRatesRequest, Currency.USD));

  expect(generator.next(RATES as any).value).toEqual(put(fetchRatesSucceeded(RATES)));
});

it('Should fetch rates and send fetch error action if base not provided and exchange currency not defined.', () => {
  const generator = fetchRatesSaga(fetchRates());

  expect(generator.next().value).toEqual(select(getExchangeCurrency));

  expect(generator.next().value).toEqual(put(fetchRatesFailed(`Currency base don't provided`)));
});

it('Should fetch pockets and send fetch error action if request throw error.', () => {
  const generator = fetchRatesSaga(fetchRates(Currency.USD));

  expect(generator.next().value).toEqual(call(fetchRatesRequest, Currency.USD));

  expect(generator.throw('error').value).toEqual(put(fetchRatesFailed('Fetch error')));
});
