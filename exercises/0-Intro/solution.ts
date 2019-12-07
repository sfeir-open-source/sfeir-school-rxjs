import { readInputFile, getRequiredFuelForMass } from '../lib';

export function getModuleMasses(filename: string) {
  return readInputFile(filename)
    .split('\n')
    .map(m => parseInt(m, 10))
    .filter(x => !isNaN(x));
}

export function getRequiredFuel(masses: number[]) {
  return masses
    .map(getRequiredFuelForMass)
    .filter(m => m > 0)
    .reduce((a, b) => a + b);
}

function getAccumulatedFuel(mass: number) {
  function* accumulate(m: number): Iterable<number> {
    const f = getRequiredFuelForMass(m);
    if (f > 0) {
      yield f;
      yield* accumulate(f);
    }
  }
  return [...accumulate(mass)];
}

export function getTotalRequiredFuel(masses: number[]) {
  return masses
    .flatMap(getAccumulatedFuel)
    .reduce((a, b) => a + b);
}
