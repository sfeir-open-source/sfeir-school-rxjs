import { map } from '../lib/sequence';
import {
  sequenceFrom,
  getRequiredFuel,
  getTotalRequiredFuel
} from './solution';

describe('sequenceFrom', () => {
  it('should iterate over source', () => {
    const ints = sequenceFrom(() => [1, 2, 3, 4, 5]);
    const dbl = map<number, number>(x => x * 2);
    const r: number[] = [];
    dbl(ints)(v => r.push(v));
    expect(r).toEqual([2, 4, 6, 8, 10]);
  });
});

describe('getRequiredFuel', () => {
  it('should calculate the required fuel', () => {
    const actual = getRequiredFuel(
      sequenceFrom(() => [12, 14, 1969, 100756])
    );
    expect(actual).toBe(2 + 2 + 654 + 33583);
  });
});

describe('getTotalRequired', () => {
  it('should calculate the required fuel', () => {
    const actual = getTotalRequiredFuel(
      sequenceFrom(() => [12, 14, 1969, 100756])
    );
    expect(actual).toBe(2 + 2 + 966 + 50346);
  });
});
