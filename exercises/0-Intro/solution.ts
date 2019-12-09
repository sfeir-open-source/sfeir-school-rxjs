import {
  readInputFile,
  getRequiredFuelForMass,
  accumulateFuelForMass
} from '../lib';

const not = <T>(f: (v: T) => boolean) => (x: T) => !f(x);
const add = (a: number, b: number) => a + b;

export function getModuleMasses(filename: string) {
  return readInputFile(filename)
    .split('\n')
    .map(m => parseInt(m, 10))
    .filter(not(isNaN));
}

export function getRequiredFuel(masses: number[]) {
  return masses
    .map(getRequiredFuelForMass)
    .filter(m => m > 0)
    .reduce(add);
}

export function getTotalRequiredFuel(masses: number[]) {
  return masses
    .flatMap(m => [...accumulateFuelForMass(m)])
    .reduce(add);
}
