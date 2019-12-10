import { TestScheduler } from 'rxjs/testing';
import { makeMetronome } from './code';

const scheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('the metronome', () => {
  it('should start when receiving a frequence, stop when director completes', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const dir = cold('--s 2s (o|)', { s: 0.5, o: 0 });
      const actual = makeMetronome(dir);

      expectObservable(
        actual
      ).toBe('--0 0.499s 1 0.499s 2 0.499s 3 0.499s 4|', [
        0,
        1,
        2,
        3,
        4
      ]);
    });
  });
});
