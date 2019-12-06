import { readFileSync } from 'fs';

function readInputFile(filename: string) {
  return readFileSync(`${__dirname}/${filename}`).toString();
}

export function createModuleMassesGetter(filename: string) {
  return () =>
    readInputFile(filename)
      .split('\n')
      .map(m => parseInt(m, 10))
      .filter(Boolean);
}

export function fuelUpper(masses: number[]) {
  return masses
    .map(m => m / 3)
    .map(Math.floor)
    .map(m => m - 2)
    .reduce((a, b) => a + b);
}
