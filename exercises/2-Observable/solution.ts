import * as readline from 'readline';

import { openInputFile } from '../lib';

export interface Observer<T> {
  next(val: T): void;
  complete(): void;
}

export interface Observable<T> {
  subscribe(observer: Observer<T>): void;
}

export function makeObservable<T>(
  subscribe: (observer: Observer<T>) => void
): Observable<T> {
  return {
    subscribe(observer) {
      subscribe(observer);
    }
  };
}

export function readLines(filename: string) {
  return makeObservable<number>(observer => {
    const fileStream = openInputFile(filename);
    const rl = readline.createInterface(fileStream);

    rl.on('line', line => {
      const value = parseInt(line, 10);
      if (!isNaN(value)) {
        observer.next(value);
      }
    });

    rl.on('close', () => {
      observer.complete();
    });
  });
}

export function map<T, U>(
  f: (v: T) => U
): (source: Observable<T>) => Observable<U> {
  return source =>
    makeObservable(observer => {
      source.subscribe({
        next(v) {
          observer.next(f(v));
        },
        complete() {
          observer.complete();
        }
      });
    });
}
