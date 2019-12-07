import { readInputFile, getRequiredFuelForMass } from '../lib';
import {
  Sequence,
  sequenceMap,
  sequenceFilter,
  sequenceFlatMap,
  sequenceReduce
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
  const numMs = sequenceMap(strMs, m => parseInt(m, 10));
  return sequenceFilter(numMs, x => !isNaN(x));
}

export function getRequiredFuel(
  masses: Sequence<number>
): number {
  const fuelRaw = sequenceMap(masses, getRequiredFuelForMass);
  const fuelPos = sequenceFilter(fuelRaw, m => m > 0);
  return sequenceReduce(fuelPos, (a, b) => a + b);
}

function getAccumulatedFuel(mass: number) {
  function* accumulate(m: number): Iterable<number> {
    const f = getRequiredFuelForMass(m);
    if (f > 0) {
      yield f;
      yield* accumulate(f);
    }
  }
  return accumulate(mass);
}

export function getTotalRequiredFuel(masses: Sequence<number>) {
  const fuel = sequenceFlatMap(masses, m =>
    sequenceFrom(getAccumulatedFuel(m))
  );
  return sequenceReduce(fuel, (a, b) => a + b);
}
