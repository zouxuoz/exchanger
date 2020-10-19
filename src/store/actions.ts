import {
  FETCH_POCKETS_REQUESTED,
  FETCH_RATES_REQUESTED,
  SET_ACTIVE_POCKET_ID,
  SET_POCKETS,
  SET_WRITE_OFF_POCKET_ID,
  SET_RECEIVE_POCKET_ID,
  SET_WRITE_OFF_AMOUNT,
  SET_RECEIVE_AMOUNT,
  EXCHANGE,
  SET_EXCHANGE_ERROR,
  FETCH_RATES_FAILED,
  FETCH_RATES_SUCCEEDED,
  FETCH_POCKETS_SUCCEEDED,
  FETCH_POCKETS_FAILED,
} from './constants';
import {
  ExchangeAction,
  FetchPocketsAction,
  FetchRatesAction,
  FetchRatesFailedAction,
  FetchRatesSucceededAction,
  SetActivePocketAction,
  SetExchangeErrorAction,
  SetPocketsAction,
  SetReceiveAmountAction,
  SetReveivePocketIdAction,
  SetWriteOffAmountAction,
  SetWriteOffPocketIdAction,
  FetchPocketsSucceededAction,
  FetchPocketsFailedAction,
} from './types';

export const fetchPockets = (): FetchPocketsAction => ({
  type: FETCH_POCKETS_REQUESTED,
});

export const fetchPocketsSucceeded = (
  pockets: FetchPocketsSucceededAction['payload'],
): FetchPocketsSucceededAction => ({
  type: FETCH_POCKETS_SUCCEEDED,
  payload: pockets,
});

export const fetchPocketsFailed = (
  error: FetchPocketsFailedAction['payload'],
): FetchPocketsFailedAction => ({
  type: FETCH_POCKETS_FAILED,
  payload: error,
});

export const fetchRates = (base?: FetchRatesAction['payload']): FetchRatesAction => ({
  type: FETCH_RATES_REQUESTED,
  payload: base,
});

export const fetchRatesSucceeded = (
  rates: FetchRatesSucceededAction['payload'],
): FetchRatesSucceededAction => ({
  type: FETCH_RATES_SUCCEEDED,
  payload: rates,
});

export const fetchRatesFailed = (
  error: FetchRatesFailedAction['payload'],
): FetchRatesFailedAction => ({
  type: FETCH_RATES_FAILED,
  payload: error,
});

export const setActivePocket = (id: SetActivePocketAction['payload']): SetActivePocketAction => ({
  type: SET_ACTIVE_POCKET_ID,
  payload: id,
});

export const setPockets = (pockets: SetPocketsAction['payload']): SetPocketsAction => ({
  type: SET_POCKETS,
  payload: pockets,
});

export const setWriteOffPocketId = (
  value: SetWriteOffPocketIdAction['payload'],
): SetWriteOffPocketIdAction => ({
  type: SET_WRITE_OFF_POCKET_ID,
  payload: value,
});

export const setReveivePocketId = (
  value: SetReveivePocketIdAction['payload'],
): SetReveivePocketIdAction => ({
  type: SET_RECEIVE_POCKET_ID,
  payload: value,
});

export const setWriteOffAmount = (
  value: SetWriteOffAmountAction['payload'],
): SetWriteOffAmountAction => ({
  type: SET_WRITE_OFF_AMOUNT,
  payload: value,
});

export const setReceiveAmount = (
  value: SetReceiveAmountAction['payload'],
): SetReceiveAmountAction => ({
  type: SET_RECEIVE_AMOUNT,
  payload: value,
});

export const exchange = (options: ExchangeAction['payload']): ExchangeAction => ({
  type: EXCHANGE,
  payload: options,
});

export const setExchangeError = (
  error?: SetExchangeErrorAction['payload'],
): SetExchangeErrorAction => ({
  type: SET_EXCHANGE_ERROR,
  payload: error,
});
