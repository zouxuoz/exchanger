import { State } from '../../types';
import {
  getExchangeWriteOffPocketId,
  getExchangeReceivePocketId,
  getExchangeWriteOffAmount,
  getExchangeReceiveAmount,
  getExchangeError,
} from '../exchange';

const TEST_STATE: State = {
  pockets: {
    data: [],
  },
  rates: {},
  exchange: {
    writeOffPocketId: '1',
    receivePocketId: '2',
    writeOffAmount: 20,
    receiveAmount: 10,
    error: 'Error',
  },
};

it('Should returns write off pocket id.', () => {
  expect(getExchangeWriteOffPocketId(TEST_STATE)).toEqual(TEST_STATE.exchange.writeOffPocketId);
});

it('Should returns receive pocket id.', () => {
  expect(getExchangeReceivePocketId(TEST_STATE)).toEqual(TEST_STATE.exchange.receivePocketId);
});

it('Should returns write off amount.', () => {
  expect(getExchangeWriteOffAmount(TEST_STATE)).toEqual(TEST_STATE.exchange.writeOffAmount);
});

it('Should returns receive an amount.', () => {
  expect(getExchangeReceiveAmount(TEST_STATE)).toEqual(TEST_STATE.exchange.receiveAmount);
});

it('Should returns error.', () => {
  expect(getExchangeError(TEST_STATE)).toEqual(TEST_STATE.exchange.error);
});
