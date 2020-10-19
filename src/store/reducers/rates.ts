import { Reducer } from 'redux';
import { FETCH_RATES_REQUESTED, FETCH_RATES_SUCCEEDED, FETCH_RATES_FAILED } from '../constants';
import { RatesActions, State } from '../types';

export const ratesReducer: Reducer<State['rates'], RatesActions> = (
  state = {
    loading: false,
    loaded: false,
  },
  action,
) => {
  switch (action.type) {
    case FETCH_RATES_REQUESTED: {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }

    case FETCH_RATES_SUCCEEDED: {
      return {
        ...state,
        loaded: true,
        loading: false,
        data: action.payload,
      };
    }

    case FETCH_RATES_FAILED: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};
