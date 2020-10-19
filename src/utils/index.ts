export const circularSlice = <T>(array: Array<T>, startIndex: number, count: number): Array<T> => {
  let result: Array<T> = [];

  for (let index = 0; index < Math.min(count, array.length); index++) {
    const element = array[(((startIndex + index) % array.length) + array.length) % array.length];

    result = [...result, element];
  }

  return result;
};

export const roundFloat = (value: number, decimals = 2): number =>
  Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
