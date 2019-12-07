import {
  readInputFile,
  getRequiredFuelForMass,
  accumulateFuelForMass
} from '../lib';

import {
  Sequence,
  map,
  filter,
  flatMap,
  reduce
} from '../lib/sequence';

export declare function sequenceFrom<T>(
  xs: Iterable<T>
): Sequence<T>;

export declare function getModuleMasses(
  filename: string
): Sequence<number>;

export declare function getRequiredFuel(
  masses: Sequence<number>
): number;

export declare function getTotalRequiredFuel(
  masses: Sequence<number>
): number;
