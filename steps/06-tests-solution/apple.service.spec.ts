import { map } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { AppleService } from '../common';

describe('AppleService', () => {
  let testScheduler: TestScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('getApples', () => {
    it('should return an apple', (done) => {
      testScheduler.run(() => {
        const sub = AppleService.getApples().subscribe((apple) => {
          expect(apple._type).toBe('Apple');
          expect(apple).toHaveProperty('color');
          expect(['red', 'green'].includes(apple.color)).toBeTruthy();
          expect(apple).toHaveProperty('rot');
          done();
          sub.unsubscribe();
        });
      });
    });

    it('should emit an apple every second', () => {
      testScheduler.run(({ expectObservable }) => {
        const actual$ = AppleService.getApples().pipe(map(() => 'a'));
        const actualSubscription = '^ 4500ms !';
        const expected = '1s a 999ms a 999ms a 999ms a';
        expectObservable(actual$, actualSubscription).toBe(expected);
      });
    });
  });
});
