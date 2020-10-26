import { circularSlice } from '../';

const TEST_ARRAY = ['A', 'B', 'C', 'D'];

it('Should returns circular slice for the passed array, when start index lower than zero.', () => {
  const result = circularSlice<string>(TEST_ARRAY, -1, 3);

  expect(result).toEqual([TEST_ARRAY[TEST_ARRAY.length - 1], TEST_ARRAY[0], TEST_ARRAY[1]]);
});

it('Should returns circular slice for the passed array, when start index greater than zero.', () => {
  const result = circularSlice<string>(TEST_ARRAY, 0, 3);

  expect(result).toEqual(TEST_ARRAY.slice(0, 3));
});

it('Should returns circular slice for the passed array, when start index is the last index.', () => {
  const result = circularSlice<string>(TEST_ARRAY, TEST_ARRAY.length - 1, 3);

  expect(result).toEqual([TEST_ARRAY[TEST_ARRAY.length - 1], TEST_ARRAY[0], TEST_ARRAY[1]]);
});

it('Should returns circular slice for the passed array, when array length lower than passed count.', () => {
  const result = circularSlice<string>(TEST_ARRAY, 0, 6);

  expect(result).toEqual(TEST_ARRAY);
});
