import { Reducer } from 'redux';
import {
  FETCH_POCKETS_REQUESTED,
  FETCH_POCKETS_SUCCEEDED,
  FETCH_POCKETS_FAILED,
  SET_ACTIVE_POCKET_ID,
  SET_POCKETS,
} from '../constants';
import { PocketsActions, State } from '../types';

export const pocketsReducer: Reducer<State['pockets'], PocketsActions> = (
  state = {
    loading: false,
    loaded: false,
    data: [],
  },
  action,
) => {
  switch (action.type) {
    case FETCH_POCKETS_REQUESTED: {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }

    case FETCH_POCKETS_SUCCEEDED: {
      return {
        ...state,
        loaded: true,
        loading: false,
        data: action.payload,
        activeId: action.payload[0]?.id,
      };
    }

    case FETCH_POCKETS_FAILED: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.payload,
      };
    }

    case SET_ACTIVE_POCKET_ID: {
      return {
        ...state,
        activeId: action.payload,
      };
    }

    case SET_POCKETS: {
      return {
        ...state,
        data: action.payload,
      };
    }

    default:
      return state;
  }
};
