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

export function sequenceFrom<T>(xs: Iterable<T>): Sequence<T> {
  return iter => {
    for (const v of xs) {
      iter(v);
    }
  };
}

export function getModuleMasses(
  filename: string
): Sequence<number> {
  const strMs = sequenceFrom(
    readInputFile(filename).split('\n')
  );
  const toNumbers = map<string, number>(m => parseInt(m, 10));
  const removeNaN = filter<number>(x => !isNaN(x));
  return removeNaN(toNumbers(strMs));
}

export function getRequiredFuel(
  masses: Sequence<number>
): number {
  const toFuel = map(getRequiredFuelForMass);
  const removeNeg = filter<number>(m => m > 0);
  const sum = reduce<number>((a, b) => a + b);
  return sum(removeNeg(toFuel(masses)));
}

export function getTotalRequiredFuel(masses: Sequence<number>) {
  const toAccFuel = flatMap<number, number>(m =>
    sequenceFrom(accumulateFuelForMass(m))
  );
  const sum = reduce<number>((a, b) => a + b);
  return sum(toAccFuel(masses));
}
