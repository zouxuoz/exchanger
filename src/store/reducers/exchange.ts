import { Reducer } from 'redux';
import {
  SET_WRITE_OFF_POCKET_ID,
  SET_RECEIVE_POCKET_ID,
  SET_WRITE_OFF_AMOUNT,
  SET_RECEIVE_AMOUNT,
  SET_EXCHANGE_ERROR,
} from '../constants';
import { ExchangeActions, State } from '../types';

export const exchangeReducer: Reducer<State['exchange'], ExchangeActions> = (
  state = {},
  action,
) => {
  switch (action.type) {
    case SET_WRITE_OFF_POCKET_ID: {
      return {
        ...state,
        writeOffPocketId: action.payload,
      };
    }
    case SET_RECEIVE_POCKET_ID: {
      return {
        ...state,
        receivePocketId: action.payload,
      };
    }
    case SET_WRITE_OFF_AMOUNT: {
      return {
        ...state,
        writeOffAmount: action.payload,
      };
    }
    case SET_RECEIVE_AMOUNT: {
      return {
        ...state,
        receiveAmount: action.payload,
      };
    }

    case SET_EXCHANGE_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};
