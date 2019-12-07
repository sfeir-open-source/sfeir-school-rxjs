import { readFileSync, createReadStream } from 'fs';

export function readInputFile(filename: string) {
  return readFileSync(`${__dirname}/${filename}`).toString();
}

export function openInputFile(filename: string) {
  return createReadStream(`${__dirname}/${filename}`);
}

export function getRequiredFuelForMass(mass: number) {
  return Math.floor(mass / 3) - 2;
}

export function* accumulateFuelForMass(
  mass: number
): Iterable<number> {
  const fuel = getRequiredFuelForMass(mass);
  if (fuel > 0) {
    yield fuel;
    yield* accumulateFuelForMass(fuel);
  }
}
