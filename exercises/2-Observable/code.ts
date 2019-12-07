import * as readline from 'readline';

import { openInputFile } from '../lib';

export interface Observer<T> {
  next(val: T): void;
  complete(): void;
}

export interface Observable<T> {
  subscribe(observer: Observer<T>): void;
}

export declare function makeObservable<T>(
  subscribe: (observer: Observer<T>) => void
): Observable<T>;

export declare function readLines(
  filename: string
): Observable<number>;

export declare function map<T, U>(
  f: (v: T) => U
): (source: Observable<T>) => Observable<U>;
