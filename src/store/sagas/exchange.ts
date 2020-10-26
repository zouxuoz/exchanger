import { put, select, all } from 'redux-saga/effects';

import { roundFloat } from '../../utils';
import { setExchangeError, setWriteOffAmount, setPockets, setReceiveAmount } from '../actions';
import {
  getExchangeRate,
  getPockets,
  getExchangeWriteOffPocketId,
  getExchangeReceivePocketId,
  getExchangeWriteOffAmount,
  getExchangeReceiveAmount,
} from '../selectors';
import { ExchangeAction, Pocket } from '../types';

function* exchangeSaga(action: ExchangeAction) {
  const pockets: Pocket[] = yield select(getPockets);

  const writeOffPocketId = yield select(getExchangeWriteOffPocketId);
  const receivePocketId = yield select(getExchangeReceivePocketId);

  if (writeOffPocketId === receivePocketId) {
    yield put(setExchangeError('Please select different pockets for exchange.'));
    return;
  }

  const writeOffPocket = pockets.find(({ id }) => id === writeOffPocketId);
  const receivePocket = pockets.find(({ id }) => id === receivePocketId);

  if (!receivePocket || !writeOffPocket) {
    yield put(setExchangeError(`Something went wrong, try to refresh page`));
    return;
  }

  let writeOffAmount = yield select(getExchangeWriteOffAmount);
  let receiveAmount = yield select(getExchangeReceiveAmount);

  const exchangeRate = yield select(getExchangeRate);

  if (writeOffAmount) {
    receiveAmount = roundFloat(writeOffAmount * exchangeRate);
  } else if (receiveAmount) {
    writeOffAmount = roundFloat(receiveAmount / exchangeRate);
  }

  if (!writeOffAmount && !receiveAmount) {
    yield put(setExchangeError('Please fill write off / receive amount field.'));
    return;
  }

  if (writeOffPocket?.balance < writeOffAmount) {
    yield put(setExchangeError(`You don't have required amount of money in write off pocket.`));
    return;
  }

  const updatedPockets = pockets.map(pocket => {
    if (pocket.id === writeOffPocketId) {
      return { ...pocket, balance: roundFloat(pocket.balance - writeOffAmount) };
    } else if (pocket.id === receivePocketId) {
      return { ...pocket, balance: roundFloat(pocket.balance + receiveAmount) };
    }

    return pocket;
  });

  yield all([
    put(setPockets(updatedPockets)),
    put(setReceiveAmount(null)),
    put(setWriteOffAmount(null)),
    put(setExchangeError()),
  ]);

  if (typeof action?.payload?.onSuccess === 'function') {
    action?.payload?.onSuccess();
  }
}

export { exchangeSaga };
