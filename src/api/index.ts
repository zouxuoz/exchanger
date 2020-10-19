import * as R from 'ramda';

import { Currency, Pocket, Rates } from '../store';

const { REACT_APP_DUMMY_RATES } = process.env;

export const fetchRates = async (base: Currency): Promise<Rates> => {
  if (REACT_APP_DUMMY_RATES === 'true') {
    return R.prop(base, {
      [Currency.USD]: {
        [Currency.GBP]: 0.7648026316,
        [Currency.USD]: 1,
        [Currency.EUR]: 0.8434547908,
        [Currency.JPY]: 104.7317813765,
      },
      [Currency.EUR]: {
        [Currency.GBP]: 0.90675,
        [Currency.USD]: 1.1856,
        [Currency.JPY]: 124.17,
        [Currency.EUR]: 1,
      },
      [Currency.GBP]: {
        [Currency.GBP]: 1,
        [Currency.USD]: 1.3075268817,
        [Currency.EUR]: 1.1028398125,
        [Currency.JPY]: 136.9396195203,
      },
      [Currency.JPY]: {
        [Currency.GBP]: 0.0073024885,
        [Currency.USD]: 0.0095482,
        [Currency.EUR]: 0.0080534751,
        [Currency.JPY]: 1,
      },
    } as Record<Currency, Rates>);
  }

  const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}`);

  let { rates } = await response.json();

  rates = R.pick(Object.values(Currency), rates as Rates);

  rates = {
    ...rates,
    [base]: 1,
  };

  return rates;
};

export const fetchPockets = (): Promise<Pocket[]> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve([
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
      ]);
    }, 500);
  });
