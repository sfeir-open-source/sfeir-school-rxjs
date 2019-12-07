import { readFileSync } from 'fs';

function readInputFile(filename: string) {
  return readFileSync(`${__dirname}/${filename}`).toString();
}

export function createModuleMassesReader(filename: string) {
  return () => {
    const masses = readInputFile(filename)
      .split('\n')
      .map(m => parseInt(m, 10))
      .filter(m => !isNaN(m));

    return masses[Symbol.iterator]();
  };
}

const fuelForMass = (mass: number) =>
  Math.max(Math.floor(mass / 3) - 2, 0);

export function* fuelAmountsForModule(mass: number) {
  let massToLaunch = mass;
  while ((massToLaunch = fuelForMass(massToLaunch)) > 0) {
    yield massToLaunch;
  }
}
