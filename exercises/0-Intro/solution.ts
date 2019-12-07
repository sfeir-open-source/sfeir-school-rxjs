import {
  readInputFile,
  getRequiredFuelForMass,
  accumulateFuelForMass
} from '../lib';

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

export function getTotalRequiredFuel(masses: number[]) {
  return masses
    .flatMap(m => [...accumulateFuelForMass(m)])
    .reduce((a, b) => a + b);
}
