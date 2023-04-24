import { map } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ApplePieBakingService, CompoteBakingService } from '../common';
import { Apple, AppleSlice, Compote, PiePlate } from '../common/models';

describe('BakingServices', () => {
  let testScheduler: TestScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('bakeCompote', () => {
    it('should return an compote', (done) => {
      const fourApples: Apple[] = [
        { _type: 'Apple', color: 'green', rot: false },
        { _type: 'Apple', color: 'green', rot: false },
        { _type: 'Apple', color: 'green', rot: false },
        { _type: 'Apple', color: 'green', rot: false },
      ];
      testScheduler.run(() => {
        const sub = CompoteBakingService.bakeCompote(fourApples).subscribe((compote) => {
          expect(compote._type).toBe('Compote');
          done();
          sub.unsubscribe();
        });
      });
    });

    it('should emit an error when not enough apples are given', (done) => {
      testScheduler.run(() => {
        CompoteBakingService.bakeCompote([{ _type: 'Apple', color: 'green', rot: false }]).subscribe({
          next() {
            fail('should not emit a Compote');
          },
          error() {
            done();
          },
        });
      });
    });

    it('should emit an apple every second', () => {
      const fourApples: Apple[] = [
        { _type: 'Apple', color: 'green', rot: false },
        { _type: 'Apple', color: 'green', rot: false },
        { _type: 'Apple', color: 'green', rot: false },
        { _type: 'Apple', color: 'green', rot: false },
      ];
      testScheduler.run(({ expectObservable }) => {
        const actual$ = CompoteBakingService.bakeCompote(fourApples).pipe(map(() => 'c'));
        const expected = '5s (c|)';
        expectObservable(actual$).toBe(expected);
      });
    });
  });

  describe('bakeApplePie', () => {
    it('should return an apple pie', (done) => {
      const pastry: PiePlate = { _type: 'PiePlate', pastry: { _type: 'PiePastry' } };
      const compote: Compote = { _type: 'Compote' };
      const appleSlices = new Array(64).fill(null).map((): AppleSlice => ({ _type: 'AppleSlice' }));
      testScheduler.run(() => {
        ApplePieBakingService.bakeApplePie(pastry, compote, appleSlices).subscribe((pie) => {
          expect(pie._type).toBe('ApplePie');
          done();
        });
      });
    });

    it('should emit an error when not enough apples slices are given', (done) => {
      const pastry: PiePlate = { _type: 'PiePlate', pastry: { _type: 'PiePastry' } };
      const compote: Compote = { _type: 'Compote' };
      const appleSlices = new Array(63).fill(null).map((): AppleSlice => ({ _type: 'AppleSlice' }));
      testScheduler.run(() => {
        ApplePieBakingService.bakeApplePie(pastry, compote, appleSlices).subscribe({
          next() {
            fail('should not emit a Compote');
          },
          error(error) {
            done();
          },
        });
      });
    });

    it('should emit an error when not pastry are present in the plate', (done) => {
      const pastry: PiePlate = { _type: 'PiePlate' };
      const compote: Compote = { _type: 'Compote' };
      const appleSlices = new Array(64).fill(null).map((): AppleSlice => ({ _type: 'AppleSlice' }));
      testScheduler.run(() => {
        ApplePieBakingService.bakeApplePie(pastry, compote, appleSlices).subscribe({
          next() {
            fail('should not emit a Compote');
          },
          error(error) {
            done();
          },
        });
      });
    });

    it('should emit an apple every second', () => {
      const pastry: PiePlate = { _type: 'PiePlate', pastry: { _type: 'PiePastry' } };
      const compote: Compote = { _type: 'Compote' };
      const appleSlices = new Array(64).fill(null).map((): AppleSlice => ({ _type: 'AppleSlice' }));
      testScheduler.run(({ expectObservable }) => {
        const actual$ = ApplePieBakingService.bakeApplePie(pastry, compote, appleSlices).pipe(map(() => 'p'));
        const expected = '5s (p|)';
        expectObservable(actual$).toBe(expected);
      });
    });
  });
});
