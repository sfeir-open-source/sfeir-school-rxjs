import { Observable, range, of } from 'rxjs/';
import { map, flatMap, take, skipWhile } from 'rxjs/operators';

import { streamInputFile, computeIntCode } from '../lib';

export declare const memory: Observable<number[]>;

export declare const halt: Observable<number>;

type input = { noun: number; verb: number };

export declare function run(
  memory: Observable<number[]>,
  input: Observable<input>
): Observable<[input, number]>;

export declare const inputs: Observable<input>;

export declare const answer: Observable<number>;
