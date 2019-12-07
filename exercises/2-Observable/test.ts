import { makeObservable, readLines } from './code';

describe('create a range', () => {
  test('make', () => {
    const range = makeObservable<number>(observer => {
      for (let i = 0; i < 10; i++) {
        observer.next(i);
      }
    });

    const actual: number[] = [];
    range.subscribe({
      next(i) {
        actual.push(i);
      },
      complete() {}
    });

    expect(actual).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
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
        expect(
          buff.every(m => typeof m === 'number' && !isNaN(m))
        );
        done();
      }
    });
  });
});
