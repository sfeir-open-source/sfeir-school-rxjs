import { of } from 'rxjs';
import { count, every } from 'rxjs/operators';

import {
  getModuleMasses,
  getRequiredFuel,
  getTotalRequiredFuel
} from './solution';

describe('getModuleMasses', () => {
  const masses = getModuleMasses('data.txt');

  it('should contain 100 entries', async () => {
    const nbEntries = await masses.pipe(count()).toPromise();
    expect(nbEntries).toBe(100);
  });

  it('should contain numbers only', async () => {
    const allNum = await masses
      .pipe(every(m => !isNaN(m)))
      .toPromise();
    expect(allNum).toBe(true);
  });
});

describe('getRequiredFuel', () => {
  it('should calculate the required fuel', async () => {
    const actual = await getRequiredFuel(
      of(12, 14, 1969, 100756)
    ).toPromise();
    expect(actual).toBe(2 + 2 + 654 + 33583);
  });
});

describe('getTotalRequired', () => {
  it('should calculate the required fuel', async () => {
    const actual = await getTotalRequiredFuel(
      of(12, 14, 1969, 100756)
    ).toPromise();
    expect(actual).toBe(2 + 2 + 966 + 50346);
  });
});
