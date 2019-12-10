import { readFileSync, createReadStream, readFile } from 'fs';
import { bindNodeCallback } from 'rxjs';

/**
 * Read a file to string
 * @param filename the filename (starting from "lib" directory)
 * @returns the string seperate by \n
 */
export function readInputFile(filename: string) {
  return readFileSync(`${__dirname}/${filename}`).toString();
}

/**
 * Open a readable stream (node) for the file name
 * @param filename the filename (starting from "lib" directory)
 * @returns the stream node corresponding to file
 */
export function openInputFile(filename: string) {
  return createReadStream(`${__dirname}/${filename}`);
}

export function streamInputFile(filename: string) {
  const getBuffer = bindNodeCallback(readFile);
  return getBuffer(`${__dirname}/${filename}`);
}

/**
 * Calculate the need fuel for a Mass :
 * Math.round(mass / 3) -2
 * @param mass the mass number
 * @returns the number corresponding to fuel needed
 */
export function getRequiredFuelForMass(mass: number) {
  return Math.floor(mass / 3) - 2;
}

/**
 * Calculate the array of fuel for a mass, this include sub-masses according to new mass added. This method also use getRequiredFuelForMass
 * @param mass
 * @returns an iterator of all the mass of fuel needed
 */
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
