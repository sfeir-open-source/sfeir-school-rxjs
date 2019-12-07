import * as readline from 'readline';

import { Observable, from } from 'rxjs';
import { map, filter, reduce, flatMap } from 'rxjs/operators';

import {
  openInputFile,
  getRequiredFuelForMass,
  accumulateFuelForMass
} from '../lib';

declare function readLines(
  filename: string
): Observable<string>;

export declare function getModuleMasses(
  filename: string
): Observable<number>;

export declare function getRequiredFuel(
  masses: Observable<number>
): Observable<number>;

export declare function getTotalRequiredFuel(
  masses: Observable<number>
): Observable<number>;
