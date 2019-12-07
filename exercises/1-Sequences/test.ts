import {
  sequenceFrom,
  getRequiredFuel,
  getTotalRequiredFuel
} from './solution';

describe('sequenceFrom', () => {
  test('it contains 100 numbers', () => {
    const ints = sequenceFrom([1, 2, 3, 4, 5]);
    const r: number[] = [];
    ints(v => r.push(v));
    expect(r).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('getRequiredFuel', () => {
  it('should calculate the required fuel', () => {
    const actual = getRequiredFuel(
      sequenceFrom([12, 14, 1969, 100756])
    );
    expect(actual).toBe(2 + 2 + 654 + 33583);
  });
});

describe('getTotalRequired', () => {
  it('should calculate the required fuel', () => {
    const actual = getTotalRequiredFuel(
      sequenceFrom([12, 14, 1969, 100756])
    );
    expect(actual).toBe(2 + 2 + 966 + 50346);
  });
});
