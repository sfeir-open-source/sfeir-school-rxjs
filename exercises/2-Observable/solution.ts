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
  subscribeFunction: (observer: Observer<T>) => void
): Observable<T> {
  return {
    subscribe(passedObserver) {
      subscribeFunction(passedObserver);
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
  functionToApply: (v: T) => U
): (sourceObservable: Observable<T>) => Observable<U> {
  return sourceObservable =>
    makeObservable(observer => {
      sourceObservable.subscribe({
        next(valueFromSourceObservable) {
          observer.next(functionToApply(valueFromSourceObservable));
        },
        complete() {
          observer.complete();
        }
      });
    });
}
