import * as readline from 'readline';

import { Observable, from } from 'rxjs';
import { map, filter, reduce, flatMap } from 'rxjs/operators';

import {
  openInputFile,
  getRequiredFuelForMass,
  accumulateFuelForMass
} from '../lib';

export function readLines(filename: string) {
  return new Observable<string>(observer => {
    const stream = openInputFile(filename);
    const rl = readline.createInterface(stream);

    rl.on('line', line => {
      observer.next(line);
    });

    rl.on('close', () => {
      observer.complete();
    });

    return () => stream.close();
  });
}

export function getModuleMasses(filename: string) {
  return readLines(filename).pipe(
    map(line => parseInt(line, 10)),
    filter(mass => !isNaN(mass))
  );
}

export function getRequiredFuel(
  masses: Observable<number>
): Observable<number> {
  return masses.pipe(
    map(getRequiredFuelForMass),
    filter(f => f > 0),
    reduce((a, b) => a + b)
  );
}

export function getTotalRequiredFuel(
  masses: Observable<number>
): Observable<number> {
  return masses.pipe(
    flatMap(m => from(accumulateFuelForMass(m))),
    reduce((a, b) => a + b)
  );
}
