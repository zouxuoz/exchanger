import { State } from '../types';
import { Currency } from '../constants';

export const getRatesState = (state: State): State['rates'] => state.rates;

export const getRates = (state: State): Record<Currency, number> | undefined => {
  const ratesState = getRatesState(state);

  return ratesState.data;
};
