import { createModuleMassesReader, fuelAmountsForModule } from './code';

const add = (a: number, b: number) => a + b;

describe('massReader', () => {
  const massReader = createModuleMassesReader('data.txt');

  test('it contains 100 numbers', () => {
    const masses = [...massReader()];
    expect(masses.length).toBe(100);
    expect(masses.every(m => typeof m === 'number' && !isNaN(m)));
  });
});

describe('fuelUpper', () => {
  test('it calculates correctly', () => {
    expect([...fuelAmountsForModule(14)].reduce(add)).toBe(2);
    expect([...fuelAmountsForModule(1969)].reduce(add)).toBe(966);
    expect([...fuelAmountsForModule(100756)].reduce(add)).toBe(50346);
  });
});
