import { Currency } from '../../constants';
import { State } from '../../types';
import { getPockets, getPocket, getActivePocketId, getVisiblePockets } from '../pockets';

const TEST_STATE: State = {
  pockets: {
    data: [
      {
        id: '1',
        currency: Currency.USD,
        balance: 1000,
      },
      {
        id: '2',
        currency: Currency.EUR,
        balance: 1000,
      },
      {
        id: '3',
        currency: Currency.GBP,
        balance: 1000,
      },
      {
        id: '4',
        currency: Currency.JPY,
        balance: 1000,
      },
    ],
    activeId: '1',
  },
  rates: {},
  exchange: {},
};

it('Should returns list of pockets.', () => {
  expect(getPockets(TEST_STATE)).toEqual(TEST_STATE.pockets.data);
});

it('Should returns pocket by passed id.', () => {
  const expectedPocket = TEST_STATE.pockets.data[0];

  expect(getPocket(TEST_STATE, expectedPocket.id)).toEqual(expectedPocket);
});

it('Should returns undefined if pocket with passed id not existed.', () => {
  expect(getPocket(TEST_STATE, 'not existed id')).toBeUndefined();
});

it('Should returns active pocket id.', () => {
  expect(getActivePocketId(TEST_STATE)).toEqual(TEST_STATE.pockets.activeId);
});

it('Should returns visible pockets.', () => {
  expect(getVisiblePockets(TEST_STATE)).toMatchInlineSnapshot(`
    Array [
      Object {
        "balance": 1000,
        "currency": "JPY",
        "id": "4",
      },
      Object {
        "balance": 1000,
        "currency": "USD",
        "id": "1",
      },
      Object {
        "balance": 1000,
        "currency": "EUR",
        "id": "2",
      },
    ]
  `);
});
