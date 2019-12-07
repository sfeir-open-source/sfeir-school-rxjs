import {
  getModuleMasses,
  getRequiredFuel,
  getTotalRequiredFuel
} from './solution';

describe('getModuleMasses', () => {
  const moduleMasses = getModuleMasses('data.txt');

  it('should return 100 entries', () => {
    expect(moduleMasses.length).toBe(100);
  });

  it('should contain numbers only', () => {
    expect(
      moduleMasses.every(
        m => typeof m === 'number' && !isNaN(m)
      )
    ).toBe(true);
  });
});

describe('getRequiredFuel', () => {
  it('should calculate the required fuel', () => {
    const actual = getRequiredFuel([12, 14, 1969, 100756]);
    expect(actual).toBe(2 + 2 + 654 + 33583);
  });
});

describe('getTotalRequired', () => {
  it('should calculate the required fuel', () => {
    const actual = getTotalRequiredFuel([12, 14, 1969, 100756]);
    expect(actual).toBe(2 + 2 + 966 + 50346);
  });
});
