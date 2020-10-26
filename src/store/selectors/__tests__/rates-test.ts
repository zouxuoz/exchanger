import { Currency } from '../../constants';
import { State } from '../../types';
import { getRates } from '../rates';

const TEST_STATE: State = {
  pockets: {
    data: [],
  },
  rates: {
    data: {
      [Currency.GBP]: 0.7648026316,
      [Currency.USD]: 1,
      [Currency.EUR]: 0.8434547908,
      [Currency.JPY]: 104.7317813765,
    },
  },
  exchange: {},
};

it('Should returns rates.', () => {
  expect(getRates(TEST_STATE)).toEqual(TEST_STATE.rates.data);
});
