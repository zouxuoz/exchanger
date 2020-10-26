import * as R from 'ramda';

import { Currency } from '../../constants';
import { State } from '../../types';
import {
  getExchangeRate,
  getWriteOffAmountValue,
  getReceiveAmountValue,
  getExchangeCurrency,
} from '../mixed';

const TEST_STATE: State = {
  pockets: {
    data: [
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
    ],
    activeId: '1',
  },
  rates: {
    data: {
      [Currency.GBP]: 0.7648026316,
      [Currency.USD]: 1,
      [Currency.EUR]: 0.8434547908,
      [Currency.JPY]: 104.7317813765,
    },
  },
  exchange: {
    writeOffPocketId: '1',
    receivePocketId: '2',
    writeOffAmount: 20,
    receiveAmount: null,
    error: 'Error',
  },
};

it('Should returns current exchange rate.', () => {
  expect(getExchangeRate(TEST_STATE)).toEqual(TEST_STATE.rates.data?.EUR);
});

it('Should returns null if receive pocket not defined', () => {
  expect(
    getExchangeRate(R.assocPath(['exchange', 'receivePocketId'], undefined, TEST_STATE)),
  ).toEqual(null);
});

it('Should returns plain write off amount value if it defined.', () => {
  expect(getWriteOffAmountValue(TEST_STATE)).toEqual(TEST_STATE.exchange.writeOffAmount);
});

it('Should returns plain receive amount value if it defined.', () => {
  expect(
    getReceiveAmountValue(
      R.pipe<State, State, State>(
        R.assocPath(['exchange', 'writeOffAmount'], null),
        R.assocPath(['exchange', 'receiveAmount'], 20),
      )(TEST_STATE),
    ),
  ).toEqual(20);
});

it('Should returns calculated receive amount value based on write off amount if it not defined.', () => {
  expect(getReceiveAmountValue(TEST_STATE)).toEqual(16.87);
});

it('Should returns calculated write off amount value based on receive amount if it not defined.', () => {
  expect(
    getWriteOffAmountValue(
      R.pipe<State, State, State>(
        R.assocPath(['exchange', 'writeOffAmount'], null),
        R.assocPath(['exchange', 'receiveAmount'], 20),
      )(TEST_STATE),
    ),
  ).toEqual(23.71);
});

it('Should returns exchange currency if write of pocket is defined.', () => {
  expect(getExchangeCurrency(TEST_STATE)).toEqual(Currency.USD);
});

it('Should returns exchange currency if write of pocket not defined.', () => {
  expect(
    getExchangeCurrency(R.assocPath(['exchange', 'writeOffPocketId'], undefined, TEST_STATE)),
  ).toEqual(Currency.USD);
});
