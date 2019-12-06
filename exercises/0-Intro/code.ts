import { readFileSync } from 'fs';

function readInputFile(filename: string) {
  return readFileSync(`${__dirname}/${filename}`).toString();
}

export function getModuleMasses() {
  return readInputFile('data.txt')
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
