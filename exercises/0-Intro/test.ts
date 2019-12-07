import { createModuleMassesGetter, fuelUpper } from './code';

describe('getModuleMasses', () => {
  const getModuleMasses = createModuleMassesGetter('data.txt');

  it('should return 100 entries', () => {
    const actual = getModuleMasses();
    expect(actual.length).toBe(100);
  });

  it('should contain numbers only', () => {
    const actual = getModuleMasses();
    expect(
      actual.every(m => typeof m === 'number' && !isNaN(m))
    ).toBe(true);
  });
});

describe('fuelUpper', () => {
  it('should calculate the required fuel', () => {
    const actual = fuelUpper([12, 14, 1969, 100756]);
    expect(actual).toBe(2 + 2 + 654 + 33583);
  });
});
