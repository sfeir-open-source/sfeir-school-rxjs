import { of } from 'rxjs';
import { count } from 'rxjs/operators';

import { inputs, memory, run } from './solution';

describe('memory', () => {
  it('should read from data file', async () => {
    const actual = await memory.toPromise();
    expect(actual.length).toBeGreaterThan(100);
    expect(
      actual.every(n => typeof n === 'number' && !isNaN(n))
    ).toBe(true);
  });
});

describe('inputs', () => {
  it('should return 100^2 pairs of number', async () => {
    const actual = await inputs.pipe(count()).toPromise();
    expect(actual).toBe(100 ** 2);
  });
});

describe('run', () => {
  it('should return input and result', async () => {
    const mem = of([1, 0, 0, 3, 2, 3, 11, 0, 99, 30, 40, 50]);
    const input = of({ noun: 9, verb: 10 });
    const actual = await run(mem, input).toPromise();
    expect(actual).toEqual([{ noun: 9, verb: 10 }, 3500]);
  });
});
