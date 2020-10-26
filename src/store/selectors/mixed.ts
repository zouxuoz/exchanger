import { roundFloat } from '../../utils';
import { State } from '../types';
import { Currency } from '../constants';
import {
  getExchangeReceiveAmount,
  getExchangeReceivePocketId,
  getExchangeWriteOffAmount,
  getExchangeWriteOffPocketId,
} from './exchange';
import { getActivePocketId, getPocket, getPockets } from './pockets';
import { getRates } from './rates';

export const getExchangeRate = (state: State): number | null => {
  const receivePocketId = getExchangeReceivePocketId(state);

  if (!receivePocketId) {
    return null;
  }

  const receivePocket = getPocket(state, receivePocketId);
  const rates = getRates(state);

  if (rates && receivePocket) {
    return rates[receivePocket?.currency] || null;
  }

  return null;
};

export const getWriteOffAmountValue = (state: State): number | string => {
  const writeOffAmount = getExchangeWriteOffAmount(state);
  const receiveAmount = getExchangeReceiveAmount(state);

  const exchangeRate = getExchangeRate(state);

  if (writeOffAmount === null && receiveAmount !== null && exchangeRate) {
    return roundFloat(Number(receiveAmount) / exchangeRate);
  }

  return writeOffAmount || '';
};

export const getReceiveAmountValue = (state: State): number | string => {
  const writeOffAmount = getExchangeWriteOffAmount(state);
  const receiveAmount = getExchangeReceiveAmount(state);

  const exchangeRate = getExchangeRate(state);

  if (receiveAmount === null && writeOffAmount !== null && exchangeRate) {
    return roundFloat(Number(writeOffAmount) * exchangeRate);
  }

  return receiveAmount || '';
};

export const getExchangeCurrency = (state: State): Currency | null => {
  const pockets = getPockets(state);
  const pocketId = getExchangeWriteOffPocketId(state) || getActivePocketId(state);

  const pocket = pockets.find(({ id }) => id === pocketId);

  return pocket?.currency || null;
};
