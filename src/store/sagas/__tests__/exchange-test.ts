import { all, put, select } from 'redux-saga/effects';

import {
  exchange,
  setExchangeError,
  setPockets,
  setReceiveAmount,
  setWriteOffAmount,
} from '../../actions';
import { Currency } from '../../constants';
import {
  getPockets,
  getExchangeWriteOffPocketId,
  getExchangeReceivePocketId,
  getExchangeWriteOffAmount,
  getExchangeReceiveAmount,
  getExchangeRate,
} from '../../selectors';
import { exchangeSaga } from '../exchange';

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

let options: { onSuccess: () => void };
let generator: Generator;

beforeEach(() => {
  options = { onSuccess: jest.fn() };

  generator = exchangeSaga(exchange(options));

  expect(generator.next().value).toEqual(select(getPockets));
  expect(generator.next(POCKETS).value).toEqual(select(getExchangeWriteOffPocketId));
});

it('Should exchange money between pockets if write off amount defined.', () => {
  expect(generator.next('1').value).toEqual(select(getExchangeReceivePocketId));
  expect(generator.next('2').value).toEqual(select(getExchangeWriteOffAmount));
  expect(generator.next(20).value).toEqual(select(getExchangeReceiveAmount));
  expect(generator.next(null).value).toEqual(select(getExchangeRate));
  expect(generator.next(0.8434547908).value).toEqual(
    all([
      put(
        setPockets([
          {
            id: '1',
            currency: Currency.USD,
            balance: 980,
          },
          {
            id: '2',
            currency: Currency.EUR,
            balance: 1016.87,
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
        ]),
      ),
      put(setReceiveAmount(null)),
      put(setWriteOffAmount(null)),
      put(setExchangeError()),
    ]),
  );

  generator.next();

  expect(options.onSuccess).toHaveBeenCalled();
});

it('Should exchange money between pockets if receive amount defined.', () => {
  expect(generator.next('1').value).toEqual(select(getExchangeReceivePocketId));
  expect(generator.next('2').value).toEqual(select(getExchangeWriteOffAmount));
  expect(generator.next(null).value).toEqual(select(getExchangeReceiveAmount));
  expect(generator.next(20).value).toEqual(select(getExchangeRate));
  expect(generator.next(0.8434547908).value).toEqual(
    all([
      put(
        setPockets([
          {
            id: '1',
            currency: Currency.USD,
            balance: 976.29,
          },
          {
            id: '2',
            currency: Currency.EUR,
            balance: 1020,
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
        ]),
      ),
      put(setReceiveAmount(null)),
      put(setWriteOffAmount(null)),
      put(setExchangeError()),
    ]),
  );

  generator.next();

  expect(options.onSuccess).toHaveBeenCalled();
});

it('Should returns error if write off amount and receive amount not defined.', () => {
  expect(generator.next('1').value).toEqual(select(getExchangeReceivePocketId));
  expect(generator.next('2').value).toEqual(select(getExchangeWriteOffAmount));
  expect(generator.next(null).value).toEqual(select(getExchangeReceiveAmount));
  expect(generator.next(null).value).toEqual(select(getExchangeRate));

  expect(generator.next(0.8434547908).value).toEqual(
    put(setExchangeError('Please fill write off / receive amount field.')),
  );

  generator.next();

  expect(options.onSuccess).not.toHaveBeenCalled();
});

it('Should returns error if write off pocket and receive pocket is the same.', () => {
  expect(generator.next('1').value).toEqual(select(getExchangeReceivePocketId));
  expect(generator.next('1').value).toEqual(
    put(setExchangeError('Please select different pockets for exchange.')),
  );

  generator.next();

  expect(options.onSuccess).not.toHaveBeenCalled();
});

it('Should returns error if write off pocket don`t have required amount money to exchange', () => {
  expect(generator.next('1').value).toEqual(select(getExchangeReceivePocketId));
  expect(generator.next('2').value).toEqual(select(getExchangeWriteOffAmount));
  expect(generator.next(null).value).toEqual(select(getExchangeReceiveAmount));
  expect(generator.next(20000).value).toEqual(select(getExchangeRate));
  expect(generator.next(0.8434547908).value).toEqual(
    put(setExchangeError(`You don't have required amount of money in write off pocket.`)),
  );

  generator.next();

  expect(options.onSuccess).not.toHaveBeenCalled();
});
