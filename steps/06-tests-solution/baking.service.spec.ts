import { map } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { BakingService } from '../common/baking.service-solution';
import { Apple, AppleSlice, Compote, PiePlate } from '../common/models';

jest.setTimeout(10_000);

describe('BakingService', () => {
  describe('bakeCompote', () => {
    it('should return an compote', (done) => {
      const fourApples: Apple[] = [
        { _type: 'Apple', color: 'green', rot: false },
        { _type: 'Apple', color: 'green', rot: false },
        { _type: 'Apple', color: 'green', rot: false },
        { _type: 'Apple', color: 'green', rot: false },
      ];
      const sub = BakingService.bakeCompote(fourApples).subscribe((compote) => {
        expect(compote._type).toBe('Compote');
        done();
        sub.unsubscribe();
      });
    });
    it('should emit an error when not enough apples are given', (done) => {
      BakingService.bakeCompote([{ _type: 'Apple', color: 'green', rot: false }]).subscribe({
        next() {
          fail('should not emit a Compote');
        },
        error(error) {
          done();
        },
      });
    });

    it('should emit an apple every second', () => {
      const fourApples: Apple[] = [
        { _type: 'Apple', color: 'green', rot: false },
        { _type: 'Apple', color: 'green', rot: false },
        { _type: 'Apple', color: 'green', rot: false },
        { _type: 'Apple', color: 'green', rot: false },
      ];
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
      testScheduler.run(({ expectObservable }) => {
        const actual$ = BakingService.bakeCompote(fourApples).pipe(map(() => 'c'));
        const expected = '- 4999ms (c|)';
        expectObservable(actual$).toBe(expected);
      });
    });
  });
  describe('bakeApplePie', () => {
    it('should return an apple pie', (done) => {
      const pastry: PiePlate = { _type: 'PiePlate', pastry: { _type: 'PiePastry' } };
      const compote: Compote = { _type: 'Compote' };
      const appleSlices = new Array(64).fill(null).map((): AppleSlice => ({ _type: 'AppleSlice' }));
      BakingService.bakeApplePie(pastry, compote, appleSlices).subscribe((pie) => {
        expect(pie._type).toBe('ApplePie');
        done();
      });
    });
    it('should emit an error when not enough apples slices are given', (done) => {
      const pastry: PiePlate = { _type: 'PiePlate', pastry: { _type: 'PiePastry' } };
      const compote: Compote = { _type: 'Compote' };
      const appleSlices = new Array(63).fill(null).map((): AppleSlice => ({ _type: 'AppleSlice' }));
      BakingService.bakeApplePie(pastry, compote, appleSlices).subscribe({
        next() {
          fail('should not emit a Compote');
        },
        error(error) {
          done();
        },
      });
    });
    it('should emit an error when not pastry are present in the plate', (done) => {
      const pastry: PiePlate = { _type: 'PiePlate' };
      const compote: Compote = { _type: 'Compote' };
      const appleSlices = new Array(64).fill(null).map((): AppleSlice => ({ _type: 'AppleSlice' }));
      BakingService.bakeApplePie(pastry, compote, appleSlices).subscribe({
        next() {
          fail('should not emit a Compote');
        },
        error(error) {
          done();
        },
      });
    });

    it('should emit an apple every second', () => {
      const pastry: PiePlate = { _type: 'PiePlate', pastry: { _type: 'PiePastry' } };
      const compote: Compote = { _type: 'Compote' };
      const appleSlices = new Array(64).fill(null).map((): AppleSlice => ({ _type: 'AppleSlice' }));
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
      testScheduler.run(({ expectObservable }) => {
        const actual$ = BakingService.bakeApplePie(pastry, compote, appleSlices).pipe(map(() => 'p'));
        const expected = '- 4999ms (p|)';
        expectObservable(actual$).toBe(expected);
      });
    });
  });
});
