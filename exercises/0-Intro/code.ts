import {
  readInputFile,
  getRequiredFuelForMass,
  accumulateFuelForMass
} from '../lib';

export declare function getModuleMasses(
  filename: string
): number[];

export declare function getRequiredFuel(
  masses: number[]
): number;

export declare function getTotalRequiredFuel(
  masses: number[]
): number;
