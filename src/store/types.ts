import {
  Currency,
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
  FETCH_POCKETS_SUCCEEDED,
  FETCH_POCKETS_FAILED,
  FETCH_RATES_SUCCEEDED,
  FETCH_RATES_FAILED,
} from './constants';

export type Pocket = {
  id: string;
  currency: Currency;
  balance: number;
};

export type Rates = Record<Currency, number>;

export type State = {
  pockets: {
    data: Pocket[];
    loading?: boolean;
    loaded?: boolean;
    error?: string;
    activeId?: string;
  };

  rates: {
    data?: Rates;
    loading?: boolean;
    loaded?: boolean;
    error?: string;
  };

  exchange: {
    writeOffPocketId?: string;
    receivePocketId?: string;
    writeOffAmount?: number | null;
    receiveAmount?: number | null;
    error?: string;
  };
};

export type FetchPocketsAction = {
  type: typeof FETCH_POCKETS_REQUESTED;
};

export type FetchPocketsSucceededAction = {
  type: typeof FETCH_POCKETS_SUCCEEDED;
  payload: Pocket[];
};

export type FetchPocketsFailedAction = {
  type: typeof FETCH_POCKETS_FAILED;
  payload: string;
};

export type SetActivePocketAction = {
  type: typeof SET_ACTIVE_POCKET_ID;
  payload: string;
};

export type SetPocketsAction = {
  type: typeof SET_POCKETS;
  payload: Pocket[];
};

export type PocketsActions =
  | FetchPocketsAction
  | FetchPocketsSucceededAction
  | FetchPocketsFailedAction
  | SetPocketsAction
  | SetActivePocketAction;

export type FetchRatesAction = {
  type: typeof FETCH_RATES_REQUESTED;
  payload?: Currency;
};

export type FetchRatesSucceededAction = {
  type: typeof FETCH_RATES_SUCCEEDED;
  payload: Rates;
};

export type FetchRatesFailedAction = {
  type: typeof FETCH_RATES_FAILED;
  payload: string;
};

export type RatesActions = FetchRatesAction | FetchRatesSucceededAction | FetchRatesFailedAction;

export type SetWriteOffPocketIdAction = {
  type: typeof SET_WRITE_OFF_POCKET_ID;
  payload: string | undefined;
};

export type SetReveivePocketIdAction = {
  type: typeof SET_RECEIVE_POCKET_ID;
  payload: string | undefined;
};

export type SetWriteOffAmountAction = {
  type: typeof SET_WRITE_OFF_AMOUNT;
  payload: number | null;
};

export type SetReceiveAmountAction = {
  type: typeof SET_RECEIVE_AMOUNT;
  payload: number | null;
};

export type ExchangeAction = {
  type: typeof EXCHANGE;
  payload: {
    onSuccess: () => void;
  };
};

export type SetExchangeErrorAction = {
  type: typeof SET_EXCHANGE_ERROR;
  payload?: string;
};

export type ExchangeActions =
  | ExchangeAction
  | SetWriteOffPocketIdAction
  | SetReveivePocketIdAction
  | SetWriteOffAmountAction
  | SetReceiveAmountAction
  | SetExchangeErrorAction;
