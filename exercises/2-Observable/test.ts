import {
  Observable,
  makeObservable,
  readLines,
  map
} from './solution';

describe('create a range and double it', () => {
  const range = (from: number, to: number) =>
    makeObservable<number>(observer => {
      for (let i = from; i <= to; i++) {
        observer.next(i);
      }
      observer.complete();
    });

  const collect = <T>(obs: Observable<T>) => {
    return new Promise<T[]>(resolve => {
      const res: T[] = [];
      obs.subscribe({
        next(v) {
          res.push(v);
        },
        complete() {
          resolve(res);
        }
      });
    });
  };

  test('make', async () => {
    const actual = await collect(range(1, 5));
    expect(actual).toEqual([1, 2, 3, 4, 5]);
  });

  test('double', async () => {
    const dbl = map<number, number>(x => x * 2);
    const actual = await collect(dbl(range(1, 5)));
    expect(actual).toEqual([2, 4, 6, 8, 10]);
  });
});

describe('read from file', () => {
  it('should read 100 numbers', done => {
    const read = readLines('data.txt');
    const buff: number[] = [];
    read.subscribe({
      next(value) {
        buff.push(value);
      },
      complete() {
        expect(buff.length).toBe(100);
        expect(buff.every(m => !isNaN(m)));
        done();
      }
    });
  });
});
