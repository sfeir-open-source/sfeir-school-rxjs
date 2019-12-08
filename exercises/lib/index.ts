import { readFileSync, createReadStream, readFile } from 'fs';
import { bindNodeCallback } from 'rxjs';

export function readInputFile(filename: string) {
  return readFileSync(`${__dirname}/${filename}`).toString();
}

export function openInputFile(filename: string) {
  return createReadStream(`${__dirname}/${filename}`);
}

export function streamInputFile(filename: string) {
  const getBuffer = bindNodeCallback(readFile);
  return getBuffer(`${__dirname}/${filename}`);
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

export function computeIntCode(mem: number[]) {
  function aux(index: number): boolean {
    switch (mem[index]) {
      case 1:
        mem[mem[index + 3]] =
          mem[mem[index + 1]] + mem[mem[index + 2]];
        return aux(index + 4);
      case 2:
        mem[mem[index + 3]] =
          mem[mem[index + 1]] * mem[mem[index + 2]];
        return aux(index + 4);
      case 99:
        return true;
      default:
        return false;
    }
  }
  return aux(0);
}
