import { call, put } from 'redux-saga/effects';

import { fetchPockets } from '../../../api';
import { fetchPocketsFailed, fetchPocketsSucceeded } from '../../actions';
import { Currency } from '../../constants';
import { fetchPocketsSaga } from '../fetchPockets';

const POCKETS = [
  {
    id: '1',
    currency: Currency.USD,
    balance: 1000,
  },
  {
    id: '2',
    currency: Currency.EUR,
    balance: 1000,
  },
  {
    id: '3',
    currency: Currency.GBP,
    balance: 1000,
  },
  {
    id: '4',
    currency: Currency.JPY,
    balance: 1000,
  },
];

it('Should fetch pockets and send fetch success action.', () => {
  const generator = fetchPocketsSaga();

  expect(generator.next().value).toEqual(call(fetchPockets));

  expect(generator.next(POCKETS).value).toEqual(put(fetchPocketsSucceeded(POCKETS)));
});

it('Should fetch pockets and send fetch error action if request throw error.', () => {
  const generator = fetchPocketsSaga();

  expect(generator.next().value).toEqual(call(fetchPockets));

  expect(generator.throw('error').value).toEqual(put(fetchPocketsFailed('Fetch error')));
});
