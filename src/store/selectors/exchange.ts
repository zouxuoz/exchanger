import { State } from '../types';

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
