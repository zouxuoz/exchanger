import * as R from 'ramda';

import { circularSlice } from '../../utils';
import { State, Pocket } from '../types';
import { NUMBER_OF_VISIBLE_POCKETS } from '../constants';

export const getPocketsState = (state: State): State['pockets'] => state.pockets;

export const getPockets = (state: State): Pocket[] => {
  const pocketsState = getPocketsState(state);

  return pocketsState.data;
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
