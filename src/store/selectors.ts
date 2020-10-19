import * as R from 'ramda';

import { circularSlice, roundFloat } from '../utils';
import { State, Pocket } from './types';
import { Currency, NUMBER_OF_VISIBLE_POCKETS } from './constants';

export const getPocketsState = (state: State): State['pockets'] => state.pockets;
export const getRatesState = (state: State): State['rates'] => state.rates;
export const getExchangeState = (state: State): State['exchange'] => state.exchange;

export const getExchangeWriteOffPocketId = (state: State): string | undefined => {
  const exchangeState = getExchangeState(state);

  return exchangeState?.writeOffPocketId;
};
export const getExchangeReceivePocketId = (state: State): string | undefined => {
  const exchangeState = getExchangeState(state);

  return exchangeState?.receivePocketId;
};
export const getExchangeWriteOffAmount = (state: State): number | null | undefined => {
  const exchangeState = getExchangeState(state);

  return exchangeState?.writeOffAmount;
};
export const getExchangeReceiveAmount = (state: State): number | null | undefined => {
  const exchangeState = getExchangeState(state);

  return exchangeState?.receiveAmount;
};
export const getExchangeError = (state: State): string | undefined => {
  const exchangeState = getExchangeState(state);

  return exchangeState.error;
};

export const getPockets = (state: State): Pocket[] => {
  const pocketsState = getPocketsState(state);

  return pocketsState.data;
};

export const getRates = (state: State): Record<Currency, number> | undefined => {
  const ratesState = getRatesState(state);

  return ratesState.data;
};

export const getPocket = (state: State, id: string): Pocket | undefined => {
  const pockets = getPockets(state);

  return R.find(R.propEq('id', id), pockets);
};

export const getActivePocketId = (state: State): string | undefined => {
  const pocketsState = getPocketsState(state);

  return pocketsState.activeId;
};

export const getVisiblePockets = (state: State): Pocket[] => {
  const pockets = getPockets(state);
  const activePocketId = getActivePocketId(state);

  const activePocketIndex = R.findIndex(R.propEq('id', activePocketId), pockets);

  return circularSlice(pockets, activePocketIndex - 1, NUMBER_OF_VISIBLE_POCKETS);
};

export const getExchangeRate = (state: State): number | null => {
  const receivePocketId = getExchangeReceivePocketId(state);

  if (!receivePocketId) {
    return null;
  }

  const toPocket = getPocket(state, receivePocketId);
  const rates = getRates(state);

  if (rates && toPocket) {
    return rates[toPocket?.currency] || null;
  }

  return null;
};

export const getWriteOffAmountValue = (state: State): number | string => {
  const fromAmount = getExchangeWriteOffAmount(state);
  const toAmount = getExchangeReceiveAmount(state);

  const exchangeRate = getExchangeRate(state);

  if (fromAmount === null && toAmount !== null && exchangeRate) {
    return roundFloat(Number(toAmount) / exchangeRate);
  }

  return fromAmount || '';
};

export const getReceiveAmountValue = (state: State): number | string => {
  const fromAmount = getExchangeWriteOffAmount(state);
  const toAmount = getExchangeReceiveAmount(state);

  const exchangeRate = getExchangeRate(state);

  if (toAmount === null && fromAmount !== null && exchangeRate) {
    return roundFloat(Number(fromAmount) * exchangeRate);
  }

  return toAmount || '';
};
export const getActiveExchangeCurrency = (state: State): Currency | null => {
  const pockets = getPockets(state);
  const pocketId = getExchangeWriteOffPocketId(state) || getActivePocketId(state);

  const pocket = pockets.find(({ id }) => id === pocketId);

  return pocket?.currency || null;
};
