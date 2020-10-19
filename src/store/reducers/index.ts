import { combineReducers } from 'redux';

import { pocketsReducer as pockets } from './pockets';
import { ratesReducer as rates } from './rates';
import { exchangeReducer as exchange } from './exchange';

export const reducer = combineReducers({ pockets, rates, exchange });
