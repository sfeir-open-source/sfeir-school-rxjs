import { delay, Observable, of, throwError } from 'rxjs';
import { Apple, ApplePie, AppleSlice, Compote, PiePlate } from './models';

class BakingServiceImpl {
  public bakeCompote(apples: Apple[]): Observable<Compote> {
    if (apples.length !== 4) {
      return throwError(() => new Error('Cannot make compote without 4 apples'));
    }
    return of<Compote>({ _type: 'Compote' }).pipe(delay(2_000));
  }

  public bakeApplePie(piePastryInPlate: PiePlate, compote: Compote, appleSlices: AppleSlice[]): Observable<ApplePie> {
    // TODO: Lab5
    //  1. after 5s (the cooking time), the method must return an ApplePie
    //  2. if we don't have 64 slices of apples, we'll give an error
    //  3. if we don't have any dough in the dish, we'll give an error
    return null!;
  }
}

export const BakingService = new BakingServiceImpl();
