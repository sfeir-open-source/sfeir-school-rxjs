import { readFileSync } from 'fs';

export function readInputFile(filename: string) {
  return readFileSync(`${__dirname}/${filename}`).toString();
}

export function getRequiredFuelForMass(mass: number) {
  return Math.floor(mass / 3) - 2;
}
