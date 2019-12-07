import { createReadStream } from 'fs';
import * as readline from 'readline';

interface Observer<T> {
  next(val: T): void;
  complete(): void;
}

interface Observable<T> {
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
    const fileStream = createReadStream(
      __dirname + '/' + filename
    );
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
